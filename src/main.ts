import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference'
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RequestFormatInterceptor } from './shared/utils/request-format.interceptor';
import { AllExceptionsFilter } from './shared/utils/all-exceptions/all-exceptions.filter';
import { AuthGuard } from './shared/guards/auth/auth.guard';
import { AuthService } from './features/auth/auth.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    forceCloseConnections: true,
  });
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  app.useGlobalPipes(
    new ValidationPipe(), 
    // new SanitizePipe()
  
  )
  app.useGlobalFilters(
    new AllExceptionsFilter()
  )
  
  app.useGlobalInterceptors(
    new RequestFormatInterceptor()
  )
  const reflector = app.get(Reflector);
  const authService = app.get(AuthService);
  app.useGlobalGuards(
    new AuthGuard(reflector, authService)
   )

  app.enableCors({
    origin: ['*'],
    

  })
  const config = new DocumentBuilder()
  .setTitle('exemple ')
  .setVersion('1.0')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    'access-token', // This is the name of the security scheme
  )
  .build()
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  

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
