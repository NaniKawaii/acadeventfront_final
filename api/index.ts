import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

const express = require('express');
const server = express();
let cachedServer: any;

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
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.enableCors({
      origin: (origin, callback) => {
        if (isAllowedOrigin(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'), false);
        }
      },
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
