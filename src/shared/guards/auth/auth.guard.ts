import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
   
    ) {

  }
  async canActivate(context: ExecutionContext) {
    // const request = context.switchToHttp().getRequest();
    // const {authorization} = request.headers;
    
    // try {
    //   const data = this.authService.checkToken((authorization ?? '').split(' ')[1])
      
    //   request.token = data;
    //   await data.then(dados => {
    //     request.user =  this.userService.findId(dados.id)
    //   })
    //   return true
    // } catch (error) {
    //   return false
    // } 

    return true
  }
}
