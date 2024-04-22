import { forwardRef, Module } from '@nestjs/common';
import { ExportacaoService } from './exportacao.service';
import { ExportacaoController } from './exportacao.controller';
import { EmpresaModule } from '../empresa/empresa.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { Pedido } from '../pedido/entities/pedido.entity';
import { Empresa } from '../empresa/entities/empresa.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoModule } from '../pedido/pedido.module';

@Module({
  controllers: [ExportacaoController],
  providers: [ExportacaoService],
  imports:[
    TypeOrmModule.forFeature([Pedido, Empresa, Usuario]),
    forwardRef(()=> UsuarioModule),
    forwardRef(()=> EmpresaModule),
    forwardRef(()=> PedidoModule),
  ]
})
export class ExportacaoModule {}
