import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config(); // <--- must be called BEFORE anything else that uses process.env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:3000', // Next.js
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
