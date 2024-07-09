import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {

  }
  async create(createUsuarioDto: CreateUsuarioDto) {
    let existeCpf = await this.usuarioRepository.findOneBy({cpf: createUsuarioDto.cpf})
    if(existeCpf) {
      throw new BadRequestException('Usuario existente')
    }
    try {
      this.usuarioRepository.create(createUsuarioDto)
      this.usuarioRepository.save(createUsuarioDto);
    } catch (error) {
      throw new InternalServerErrorException(error)
    }

  }

  findAll(page: number, limit:number) {
    const query = `
    select * from usuario 
    order by id = 'ASC'
    LIMIT  ${limit}
    OFFSET  ${page}
    `
    const rawData =  this.usuarioRepository.query(query)   
    return rawData
  }

  async findOne(id: number) {
    let user = await this.usuarioRepository.findOne({
      where: {id: id}
    });
    return user
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    let user = await this.findOne(id)
    if(user) {
      return this.usuarioRepository.update(id, updateUsuarioDto)
    }
    else {
      throw new BadRequestException('dados invalidos')
    }
  }

  async remove(id: number) {
    let user = await this.findOne(id)
    if(user) {
      return this.usuarioRepository.delete(id)
    }
    else {
      throw new BadRequestException('dados invalidos')
    }
  }
}
