import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { ApiOkResponse, ApiResponseProperty } from '@nestjs/swagger';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,
  ) {}
  async create(createEmpresaDto: CreateEmpresaDto) {
    let existe = await this.empresaRepository.findOneBy({documento: createEmpresaDto.documento})
    console.log(existe)
    if(existe) {
      throw new BadRequestException('Empresa existente')
    }
    try {
      this.empresaRepository.create(createEmpresaDto)
      this.empresaRepository.save(createEmpresaDto);
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  
  findAll(page: number, limit:number) {
    const query = `
    select * from empresa 
    order by id = 'ASC'
    LIMIT  ${limit}
    OFFSET  ${page}
    `
    const rawData =  this.empresaRepository.query(query)   
    return rawData
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
