"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('Bootstrap');
    app.enableCors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Acad Event API')
        .setDescription('Plataforma web para gestionar eventos académicos')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });
    const port = Number(process.env.PORT) || 3000;
    await app.listen(port);
    const baseUrl = await app.getUrl();
    logger.log(`API escuchando en ${baseUrl}`);
    logger.log(`Swagger disponible en ${baseUrl}/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map