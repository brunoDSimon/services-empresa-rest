import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor( 
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>
  ) {

  }
  async create(dto: CreateAuthDto) {
    let pwt = await bcrypt.hash(dto.password,await bcrypt.genSalt())
    dto.password = pwt
    let pedido = await this.authRepository.create(dto)
    console.log(pedido)
    return  this.authRepository.save(dto)
  }

  async findAll() {
    const dados = await this.authRepository.find()
    return  dados
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
