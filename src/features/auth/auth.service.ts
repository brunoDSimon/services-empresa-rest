import { BadRequestException, Injectable, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationDto } from './dto/authentication-dto';
import { AuthGuard } from 'src/shared/guards/auth/auth.guard';

@Injectable()
export class AuthService {
  constructor( 
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,

  ) {

  }
  async create(dto: CreateAuthDto) {
    let pwt = await bcrypt.hash(dto.password,await bcrypt.genSalt())
    dto.password = pwt
    let existeEmail = await this.authRepository.existsBy({
      email: dto.email
    })
    let existeCpf = await this.authRepository.existsBy({
      cpf: dto.cpf
    })
    if(existeCpf || existeEmail) {
      throw new BadRequestException()
    } else {
      return  this.authRepository.save(dto)
    }
  }

  async findAll() {
    const dados = await this.authRepository.find()
    return  dados
  }

  async findOne(id: number) {
    return await this.authRepository.findOne({where: {id}});
  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    let result = await this.authRepository.findOne({where:{id}})

    if(result) {
      let pwt = await bcrypt.hash(updateAuthDto.password,await bcrypt.genSalt())
      updateAuthDto.password = pwt
      this.authRepository.update(id,updateAuthDto);
      return this.findOne(id)
    } else {
      throw new NotFoundException('Usuário não existente')
    }
    
  }

  async remove(id: number) {
    return this.authRepository.delete(id);
  }

  async createToken(auth: Auth) {
    console.log(auth)
    return{
      acessToken: this.jwtService.sign({
        id: auth.id,
        name: auth.name,
        email: auth.email
    }, {
        expiresIn: "7 days",
        subject: String(auth.id),
        issuer: "API TESTE",
        audience: "users"
    })
    }
  }

  async checkToken(token) { 
    try {
      let valid = await this.jwtService.verifyAsync(token, {issuer: "API TESTE"})
      return valid
    } catch (error) {
        throw new UnauthorizedException()
    }
 
  }


  async isValidToken(token: string) {
      try {
          this.checkToken(token)
          return true
      } catch (error) {
          return false
      }
  }


  async login({email, password}: AuthenticationDto) {
    let result = await this.authRepository.createQueryBuilder('auth')
    .where({
      email:email
    })
    .addSelect('auth.password')
    .getOne()
    if(!result) {
        throw new UnauthorizedException('Usuário não autorizado')
    } 
    let pwt = await bcrypt.compare(password, result.password)
    if(pwt) {
        return this.createToken(result);
    } else {
        throw new UnauthorizedException()
    }
  }

}
