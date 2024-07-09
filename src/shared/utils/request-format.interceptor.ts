/*
https://docs.nestjs.com/interceptors#interceptors
*/

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class RequestFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map(data => {
        return {
          status: data && data.error ? 0 : 1,
          message: data && data.error ? 'Erro na requisição' : 'Requisição efetuada com sucesso',
          data: data && data.error ? data.error : data
        };
      })
    );
  }
}
