import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { response, Response } from 'express';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationDto } from './dto/authentication-dto';
import { SanitizePipe } from 'src/shared/pipe/sanatize.pipe';
import { AuthGuard } from 'src/shared/guards/auth/auth.guard';
import { PublicGuardGuard } from 'src/shared/guards/public-guard.guard';
import { Public } from 'src/shared/decorators/public-routes.decorator';
import { QueryRequired } from 'src/shared/decorators/queryRequired';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiBearerAuth('access-token')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  @ApiBearerAuth('access-token')
  findAll() {
    return this.authService.findAll();
  }
  @ApiBearerAuth('access-token')
  @Get(':id')
  findOne(@QueryRequired('id') id: string,) {
    return this.authService.findOne(+id);
  }

  // @Patch(':id')
  // update(@QueryRequired('id') id: string,, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@QueryRequired('id') id: string,) {
  //   return this.authService.remove(+id);
  // }

  @Public()
  @ApiBody({type:AuthenticationDto})
  @Post('authentication')
  authentication(@Body() authenticationDto: AuthenticationDto) {
    return this.authService.login(authenticationDto)
  }
}
