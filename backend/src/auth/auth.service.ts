import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { SigninDto } from './dto/signin.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { MailService } from '../mail/mail.service';
import { LevelsService } from '../levels/levels.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private mailService: MailService,
    private levelsService: LevelsService,
  ) {}

  private generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const verificationCode = this.generateVerificationCode();
    const verificationCodeExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Set default level to 'newbie' if not provided
    let levelId = dto.levelId;
    if (!levelId) {
      const newbieLevel = await this.levelsService.findBySlug('newbie');
      levelId = newbieLevel?.id;
    }

    const user = await this.prisma.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        password: hashedPassword,
        levelId,
        verificationCode,
        verificationCodeExpiry,
      },
    });

    // Send verification email
    await this.mailService.sendVerificationEmail({
      to: user.email,
      name: `${user.firstName} ${user.lastName}`,
      verificationCode,
    });

    return this.signToken(user.id, user.email);
  }

  async signin(dto: SigninDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMatch = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    return this.signToken(user.id, user.email);
  }

  async verifyEmail(email: string, code: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isVerified) {
      return { success: true, message: 'Email already verified' };
    }

    if (!user.verificationCode || !user.verificationCodeExpiry) {
      throw new BadRequestException('No verification code found');
    }

    if (new Date() > user.verificationCodeExpiry) {
      throw new BadRequestException('Verification code has expired');
    }

    if (user.verificationCode !== code) {
      throw new BadRequestException('Invalid verification code');
    }

    await this.prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        verificationCode: null,
        verificationCodeExpiry: null,
      },
    });

    return { success: true, message: 'Email verified successfully' };
  }

  async resendVerificationEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isVerified) {
      throw new BadRequestException('Email already verified');
    }

    const verificationCode = this.generateVerificationCode();
    const verificationCodeExpiry = new Date(Date.now() + 15 * 60 * 1000);

    await this.prisma.user.update({
      where: { email },
      data: {
        verificationCode,
        verificationCodeExpiry,
      },
    });

    await this.mailService.sendVerificationEmail({
      to: user.email,
      name: `${user.firstName} ${user.lastName}`,
      verificationCode,
    });

    return { success: true, message: 'Verification email sent' };
  }

  async setUserLevel(userId: string, levelSlug: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        subscribed: true,
        level: {
          select: { slug: true }
        }
      }
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const level = await this.levelsService.findBySlug(levelSlug);

    if (!level) {
      throw new BadRequestException('Level not found');
    }

    console.log(`setUserLevel: userId=${userId}, currentLevel=${user.level?.slug}, targetLevel=${levelSlug}, subscribed=${user.subscribed}`);

    // Check if user is subscribed for premium levels (mid and pro)
    if (levelSlug === 'mid' || levelSlug === 'pro') {
      if (!user.subscribed) {
        console.log(`setUserLevel: BLOCKED - user not subscribed for premium level ${levelSlug}`);
        throw new BadRequestException(
          'Premium subscription required to access this level',
        );
      }
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { levelId: level.id },
    });

    console.log(`setUserLevel: SUCCESS - user level updated to ${levelSlug}`);
    return { success: true, message: 'User level updated successfully' };
  }

  async getUserLevel(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        level: { select: { slug: true } },
        subscribed: true,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const userLevelSlug = user.level?.slug || 'newbie';

    // Auto-downgrade non-subscribed users from premium levels
    if (
      !user.subscribed &&
      (userLevelSlug === 'mid' || userLevelSlug === 'pro')
    ) {
      const newbieLevel = await this.levelsService.findBySlug('newbie');
      await this.prisma.user.update({
        where: { id: userId },
        data: { levelId: newbieLevel?.id },
      });
      return newbieLevel?.slug || 'newbie';
    }

    return userLevelSlug;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Check if email is already taken by another user
    if (dto.email && dto.email !== user.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (existingUser) {
        throw new BadRequestException('Email is already in use');
      }
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(dto.firstName && { firstName: dto.firstName }),
        ...(dto.lastName && { lastName: dto.lastName }),
        ...(dto.email && { email: dto.email }),
      },
      include: {
        level: true,
      },
    });

    return {
      success: true,
      user: {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        levelId: updatedUser.levelId,
        level: updatedUser.level,
        subscribed: updatedUser.subscribed,
      },
    };
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const passwordMatch = await bcrypt.compare(
      dto.currentPassword,
      user.password,
    );
    if (!passwordMatch) {
      throw new BadRequestException('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { success: true, message: 'Password changed successfully' };
  }

  async getUserProgress(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        level: true,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Get all completed lessons for this user
    const completedLessons = await this.prisma.userLeasonProgress.findMany({
      where: {
        userId,
        isCompleted: true,
      },
      include: {
        leason: true,
      },
    });

    // Get total lessons count
    const totalLessons = await this.prisma.leasons.count();

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        level: user.level,
        subscribed: user.subscribed,
      },
      progress: {
        completedLessons: completedLessons.length,
        totalLessons,
        percentage:
          totalLessons > 0
            ? Math.round((completedLessons.length / totalLessons) * 100)
            : 0,
        recentCompletions: completedLessons
          .sort(
            (a, b) =>
              new Date(b.completedAt).getTime() -
              new Date(a.completedAt).getTime(),
          )
          .slice(0, 5)
          .map((p) => ({
            lessonId: p.leasonId,
            lessonTitle: p.leason.title,
            completedAt: p.completedAt,
          })),
      },
    };
  }

  private async signToken(userId: string, email: string) {
    const payload = { sub: userId, email };

    return {
      token: await this.jwt.signAsync(payload, {
        expiresIn: '30d',
      }),
    };
  }
}
