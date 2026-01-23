import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  // FAQ Endpoints
  @Get('faqs')
  getAllFAQs() {
    return this.contentService.getAllFAQs();
  }

  @Get('faqs/:id')
  getFAQById(@Param('id') id: string) {
    return this.contentService.getFAQById(id);
  }

  // Achievement Endpoints
  @Get('achievements')
  getAllAchievements() {
    return this.contentService.getAllAchievements();
  }

  @Get('achievements/:slug')
  getAchievementBySlug(@Param('slug') slug: string) {
    return this.contentService.getAchievementBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Get('achievements/user/:userId')
  getUserAchievements(@Param('userId') userId: string) {
    return this.contentService.getUserAchievements(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('achievements/unlock')
  unlockAchievement(@Body() body: { userId: string; achievementId: string }) {
    return this.contentService.unlockAchievement(body.userId, body.achievementId);
  }

  // Benefit Endpoints
  @Get('benefits')
  getAllBenefits() {
    return this.contentService.getAllBenefits();
  }

  // Audience Endpoints
  @Get('audiences')
  getAllAudiences() {
    return this.contentService.getAllAudiences();
  }

  // Playground Feature Endpoints
  @Get('playground-features')
  getAllPlaygroundFeatures() {
    return this.contentService.getAllPlaygroundFeatures();
  }

  // Cheat Sheet Endpoints
  @Get('cheat-sheet')
  getAllCheatSheetSections() {
    return this.contentService.getAllCheatSheetSections();
  }

  @Get('cheat-sheet/:slug')
  getCheatSheetSectionBySlug(@Param('slug') slug: string) {
    return this.contentService.getCheatSheetSectionBySlug(slug);
  }

  // Levels with styling
  @Get('levels')
  getAllLevelsWithStyling() {
    return this.contentService.getAllLevelsWithStyling();
  }
}
