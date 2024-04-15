import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { Auth } from './features/auth/entities/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: `mysql`,
      host: `localhost`,
      username: `root`, 
      port: 3306,
      database:`empresa`,
      password: "root",
      
      entities: [Auth],
      synchronize: true
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
        ignoreUserAgents: [/googlebot/gi],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService,
    {provide: APP_GUARD, useClass: ThrottlerGuard}
  ],
})
export class AppModule {}
