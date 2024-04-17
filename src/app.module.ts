import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { Auth } from './features/auth/entities/auth.entity';
import { AuthModule } from './features/auth/auth.module';
import { UsuariosModule } from './features/usuarios/usuarios.module';
import { EmpresasModule } from './features/empresas/empresas.module';
import { PedidosModule } from './features/pedidos/pedidos.module';
import { Empresa } from './features/empresas/entities/empresa.entity';
import { Pedido } from './features/pedidos/entities/pedido.entity';
import { Usuario } from './features/usuarios/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: `mysql`,
      host: `localhost`,
      username: `root`, 
      port: 3307,
      database:`empresa`,
      password: "root",
      maxQueryExecutionTime:3000,
      autoLoadEntities: true,
      entities: [Auth, Empresa, Pedido, Usuario],
      synchronize: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
        ignoreUserAgents: [/googlebot/gi],
      },
    ]),
    AuthModule, 
    forwardRef(()=> UsuariosModule),
    forwardRef(()=> EmpresasModule),
    forwardRef(()=> PedidosModule),
  ],
  controllers: [AppController],
  providers: [AppService,
    {provide: APP_GUARD, useClass: ThrottlerGuard}
  ],
})
export class AppModule {}
