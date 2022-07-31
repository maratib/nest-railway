import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './v1/app.module';
import { json, urlencoded } from 'body-parser';
import { join } from 'path';
import { HttpExceptionFilter } from './utils/http-exception-filter.exception';
import { Logger, ValidationPipe } from '@nestjs/common';
import { getLogLevels } from './config/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: getLogLevels(),
  });

  const config = app.get<ConfigService>(ConfigService);
  const logger = new Logger('main.ts');
  const port = config.get('port');

  // Add Body parser
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

  // Add helmet
  app.use(helmet());

  app.enableCors();

  // Set view engine
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.setGlobalPrefix('api/v1');

  const configApi = new DocumentBuilder()
    .setTitle('Demo Application')
    .setDescription('Demo API Application')
    .setVersion('v1')
    .addTag('Demo')
    .addBearerAuth()
    // .addSecurityRequirements('bearerAuth')

    // .addSecurity('ApiKeyAuth', {
    //   type: 'apiKey',
    //   in: 'header',
    //   name: 'Authorization',
    // })
    .build();
  const document = SwaggerModule.createDocument(app, configApi);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(port, () => {
    logger.debug(`Started at port: ${port}`);
  });
}
bootstrap();
