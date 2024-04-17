import { BadRequestException, Injectable } from '@nestjs/common';
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
    this.usuarioRepository.create(createUsuarioDto)
    return this.usuarioRepository.save(createUsuarioDto);
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  async findOne(id: number) {
    let user = await this.usuarioRepository.findOne({
      where: {id: id}
    });
    return user != null ? user : {}
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    let user = await this.findOne(id)
    if(user) {
      this.usuarioRepository.update(id, updateUsuarioDto)
    }
    else {
      throw new BadRequestException('dados invalidos')
    }
  }

  async remove(id: number) {
    let user = await this.findOne(id)
    if(user) {
      this.usuarioRepository.delete(id)
    }
    else {
      throw new BadRequestException('dados invalidos')
    }
  }
}
