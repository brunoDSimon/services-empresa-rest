import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    TypeOrmModule.forFeature([Auth]),
    JwtModule.register({
      secret: `-{-KwR2q119a*X-35G,£}W,k=Ut\<uk;`
  }),
  ],
  exports:[AuthService]
})
export class AuthModule {}
