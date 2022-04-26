"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.origin = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const cookieSession = require("express-session");
const passport = require("passport");
const express = require("express");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const config_1 = require("./utils/config");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const devOrigins = [
    'http://localhost',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'localho.st:3000',
];
const prodOrigins = [
    'https://edfhr.org',
    'http://edfhr.org',
    'https://team.edfhr.org',
    'https://portal.edfhr.org',
    'https://portal-dev.edfhr.org',
    /\.edfhr\.org$/,
];
exports.origin = process.env.NODE_ENV === 'production' ? prodOrigins : devOrigins;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bodyParser: true,
        logger: true,
    });
    const swaqqgerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Edfhr Api')
        .setDescription('The EDFHR API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaqqgerConfig);
    swagger_1.SwaggerModule.setup('api/v3/doc', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    app.enableCors({
        origin: exports.origin,
        credentials: true,
    });
    app.use(cookieParser());
    app.use(cookieSession({
        secret: config_1.default.SECRET,
        name: '__ed',
        saveUninitialized: true,
        resave: false,
        store: MongoStore.create({
            mongoUrl: config_1.default.MONGO_URI,
            ttl: 14 * 24 * 60 * 60,
            autoRemove: 'disabled',
        }),
    }));
    const PORT = process.env.PORT || 8000;
    app.use(express.json({ limit: '50mb' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useStaticAssets(path_1.join(__dirname, '..', 'public'));
    app.setBaseViewsDir(path_1.join(__dirname, '..', 'public/views'));
    app.setViewEngine('hbs');
    await app.listen(PORT, () => {
        var _a, _b;
        console.log(`process.env.DOCKER: ${(_b = (_a = process.env) === null || _a === void 0 ? void 0 : _a.DOCKER) === null || _b === void 0 ? void 0 : _b.toString()}`);
        common_1.Logger.log(`server started on port ${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map