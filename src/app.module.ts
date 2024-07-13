import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Auth } from './features/auth/entities/auth.entity';
import { AuthModule } from './features/auth/auth.module';
import { Empresa } from './features/empresa/entities/empresa.entity';
import { Pedido } from './features/pedido/entities/pedido.entity';
import { Usuario } from './features/usuario/entities/usuario.entity';
import { UsuarioModule } from './features/usuario/usuario.module';
import { EmpresaModule } from './features/empresa/empresa.module';
import { PedidoModule } from './features/pedido/pedido.module';
import { ExportacaoModule } from './features/exportacao/exportacao.module';
import { RequestFormatInterceptor } from './shared/utils/request-format.interceptor';
import { DashboardsModule } from './features/dashboards/dashboards.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: `localhost`,
      username: `root`, 
      port: 3306,
      database:`empresa`,
      password: "root",
      maxQueryExecutionTime:3000,
      autoLoadEntities: true,
      entities: [Auth, Empresa, Pedido, Usuario],
      synchronize: true,
      timezone: "-03:00",
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
        ignoreUserAgents: [/googlebot/gi],
      },
    ]),
    AuthModule, 
    forwardRef(()=> UsuarioModule),
    forwardRef(()=> EmpresaModule),
    forwardRef(()=> PedidoModule),
    forwardRef(()=> ExportacaoModule),
    DashboardsModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {provide: APP_GUARD, useClass: ThrottlerGuard},
    // {provide: APP_INTERCEPTOR, useClass:RequestFormatInterceptor}
  ],
})
export class AppModule {}
