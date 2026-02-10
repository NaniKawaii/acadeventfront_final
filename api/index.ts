import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

const express = require('express');
const server = express();
let cachedServer: any;

async function bootstrap() {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.enableCors({
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
      credentials: true
    });
    await app.init();
    cachedServer = server;
  }
  return cachedServer;
}

export default async function handler(req: any, res: any) {
  const app = await bootstrap();
  return app(req, res);
}
