import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/features/auth/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
   private authService: AuthService
    ) {

  }
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const {authorization} = request.headers;
    console.log(authorization.split(' ')[1])
    const data = await this.authService.checkToken((authorization ?? '').split(' ')[1])
    request.token = data;
    request.user =  await this.authService.findOne(data.id)
    try {
      
      return true
    } catch (error) {
      return false
    } 

  }
}
