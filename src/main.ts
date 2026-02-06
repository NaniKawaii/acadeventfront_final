import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('Bootstrap');
  
  // Enable CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
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
