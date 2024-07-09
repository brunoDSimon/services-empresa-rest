import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference'
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import {  SanitizePipe } from './shared/pipe/sanatize.pipe';
import { RequestFormatInterceptor } from './shared/utils/request-format.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    forceCloseConnections: true,
  });
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  app.useGlobalPipes(
    new ValidationPipe(), 
    new SanitizePipe()
  
  )
  
  app.useGlobalInterceptors(
    new RequestFormatInterceptor()
  )

  app.enableCors({
    origin: ['*'],
    

  })
  const config = new DocumentBuilder()
  .setTitle('exemple ')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  const OpenApiSpecification =
  /* … */

  app.use(
    '/reference',
    apiReference({
      spec: {
        content: document,
      },
      darkMode:true,
      theme: 'solarized',
      layout: 'modern',
      hideModels: true,
      hideDownloadButton:true
    }),
  )
 
  await app.listen(3000);
}
bootstrap();
