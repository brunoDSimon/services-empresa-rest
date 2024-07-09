/*
https://docs.nestjs.com/interceptors#interceptors
*/

import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class RequestFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map(data => {
        // Checar o status da resposta e ajustar se necessário
        if (response.statusCode === HttpStatus.OK || response.statusCode === HttpStatus.CREATED) {
          return {
            status: 1,
            message: 'Requisição efetuada com sucesso',
            data: data
          };
        } else {
          return {
            status: -1,
            message: 'Erro na requisição',
            data: null
          };
        }
      })
    );
  }
}
