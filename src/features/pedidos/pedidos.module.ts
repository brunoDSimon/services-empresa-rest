import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { Pedido } from './entities/pedido.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from '../empresas/entities/empresa.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  controllers: [PedidosController],
  providers: [PedidosService],
  imports:[
    TypeOrmModule.forFeature([Pedido, Empresa, Usuario]),
  ]
})
export class PedidosModule {}
