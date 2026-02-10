import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

const defaultCorsOrigins = [
  'http://localhost:3000',
  'https://acadeventfront.vercel.app',
  'https://acadeventfront-git-despliegue-luxs-projects-7904e8a4.vercel.app',
  'https://acadeventfront-oubuav17e-luxs-projects-7904e8a4.vercel.app'
];

const envCorsOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

const allowedCorsOrigins = new Set([...defaultCorsOrigins, ...envCorsOrigins]);

const isAllowedOrigin = (origin?: string) => {
  if (!origin) {
    return true;
  }
  if (allowedCorsOrigins.has(origin)) {
    return true;
  }
  try {
    const hostname = new URL(origin).hostname;
    return hostname.startsWith('acadeventfront') && hostname.endsWith('.vercel.app');
  } catch {
    return false;
  }
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('Bootstrap');
  
  // Enable CORS
  app.enableCors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'), false);
      }
    },
    credentials: true,
  });
  
  const config = new DocumentBuilder()
    .setTitle('Acad Event API')
    .setDescription('Plataforma web para gestionar eventos académicos')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Serve static files for certificates
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
  const baseUrl = await app.getUrl();
  logger.log(`API escuchando en ${baseUrl}`);
  logger.log(`Swagger disponible en ${baseUrl}/docs`);
}

bootstrap();
