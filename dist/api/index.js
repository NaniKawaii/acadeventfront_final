"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express = require('express');
const server = express();
let cachedServer;
async function bootstrap() {
    if (!cachedServer) {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
        app.enableCors({
            origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
            credentials: true
        });
        await app.init();
        cachedServer = server;
    }
    return cachedServer;
}
async function handler(req, res) {
    const app = await bootstrap();
    return app(req, res);
}
//# sourceMappingURL=index.js.map