import { Module } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { EmpresasController } from './empresas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { Pedido } from '../pedidos/entities/pedido.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  controllers: [EmpresasController],
  providers: [EmpresasService],
  imports:[
    TypeOrmModule.forFeature([Empresa, Pedido, Usuario]),

  ]
})
export class EmpresasModule {}
