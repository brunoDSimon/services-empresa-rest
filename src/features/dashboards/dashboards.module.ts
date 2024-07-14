import { forwardRef, Module } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { DashboardsController } from './dashboards.controller';
import { Pedido } from '../pedido/entities/pedido.entity';
import { Empresa } from '../empresa/entities/empresa.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from '../usuario/usuario.module';
import { EmpresaModule } from '../empresa/empresa.module';

@Module({
  controllers: [DashboardsController],
  providers: [DashboardsService],
  imports:[
    TypeOrmModule.forFeature([Pedido, Empresa, Usuario]),
    forwardRef(()=> UsuarioModule),
    forwardRef(()=> EmpresaModule),
  ]
})
export class DashboardsModule {}
