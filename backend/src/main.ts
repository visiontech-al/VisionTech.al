import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // We sit behind Cloudflare -> nginx, so the socket address is always
  // 127.0.0.1. Without this the rate limiter buckets every visitor under that
  // one address and they throttle each other out of a single shared quota.
  app.set('trust proxy', true);

  // CORS — must be registered before all other middleware
  app.enableCors({
    origin: ['https://visiontech.al', 'https://www.visiontech.al'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Security (after CORS so helmet headers don't interfere with preflight)
  app.use(helmet());

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // API prefix
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/api`);
}
bootstrap();

