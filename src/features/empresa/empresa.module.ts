import { Module } from '@nestjs/common';
import { EmpresaController } from './empresa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { EmpresaService } from './empresa.service';
import { Pedido } from '../pedido/entities/pedido.entity';
import { Usuario } from '../usuario/entities/usuario.entity';

@Module({
  controllers: [EmpresaController],
  providers: [EmpresaService],
  imports:[
    TypeOrmModule.forFeature([Empresa, Pedido, Usuario]),

  ]
})
export class EmpresaModule {}
