import { forwardRef, Module } from '@nestjs/common';
import { Pedido } from './entities/pedido.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Empresa } from '../empresa/entities/empresa.entity';
import { EmpresaModule } from '../empresa/empresa.module';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  controllers: [PedidoController],
  providers: [PedidoService],
  imports:[
    TypeOrmModule.forFeature([Pedido, Empresa, Usuario]),
    forwardRef(()=> UsuarioModule),
    forwardRef(()=> EmpresaModule),
  ]
})
export class PedidoModule {}
