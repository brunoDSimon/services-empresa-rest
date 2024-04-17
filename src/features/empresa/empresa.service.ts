import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,
  ) {}
  create(createEmpresaDto: CreateEmpresaDto) {
    this.empresaRepository.create(createEmpresaDto)
    return this.empresaRepository.save(createEmpresaDto);
  }

  findAll() {
    return this.empresaRepository.find();
  }

  async findOne(id: number) {
    let empresa = await this.empresaRepository.findOne({
      where: {id:id}
    })
    return empresa;
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    let empresa = this.empresaRepository.findOne({where:{id:id}})
    if(empresa) {
      return this.empresaRepository.update(id, updateEmpresaDto)
    } else {
      throw new BadRequestException('dados invalidos')
    }
  }

  remove(id: number) {
    let empresa = this.empresaRepository.findOne({where:{id:id}})
    if(empresa) {
      return this.empresaRepository.delete(id)
    } else {
      throw new BadRequestException('dados invalidos')
    }
  }
}
