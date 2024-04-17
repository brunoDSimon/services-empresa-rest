import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    forceCloseConnections: true,
  });
  app.useGlobalPipes(new ValidationPipe())
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
      theme: 'bluePlanet',
      layout: 'modern',
      hideModels: true
    }),
  )
  
  await app.listen(3000);
}
bootstrap();
