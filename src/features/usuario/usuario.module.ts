import { Module } from '@nestjs/common';
import { Usuario } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { Empresa } from '../empresa/entities/empresa.entity';
import { Pedido } from '../pedido/entities/pedido.entity';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService],
  imports:[
    TypeOrmModule.forFeature([Usuario, Empresa, Pedido]),
  ]
})
export class UsuarioModule {}
