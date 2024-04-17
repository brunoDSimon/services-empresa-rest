import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioService } from '../usuario/usuario.service';
import { EmpresaService } from '../empresa/empresa.service';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Empresa } from '../empresa/entities/empresa.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
    private readonly usuarioService: UsuarioService,
    private readonly empresaService: EmpresaService
  ) {
    
  }
  async create(createPedidoDto: CreatePedidoDto) {

    let usuario = await this.usuarioService.findOne(+createPedidoDto.usuario)
    let empresa = await this.empresaService.findOne(+createPedidoDto.empresa)
    if( usuario && empresa) {
      this.pedidoRepository.create(createPedidoDto);
      return this.pedidoRepository.save(createPedidoDto);
    } else {
      throw new BadRequestException('dados invalidos')
    }
  }

  async findAll(page, limit) {
    const query = this.pedidoRepository.createQueryBuilder('pedido')
    .leftJoinAndSelect('pedido.empresa', 'empresaId')
    .innerJoinAndSelect('pedido.usuario', 'usuarioId')
    
    const dados = await paginate(query,{
      page:page,
      limit: limit,
    })
    return dados
  }

  findOne(id: number) {
    return this.pedidoRepository.findOne({where:{id:id}});
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    let pedido = await this.findOne(id);

    if(pedido) {
      return this.pedidoRepository.update(id, updatePedidoDto);
    } else {
      throw new BadRequestException('dados invalidos');
    }
  }

  remove(id: number) {
    return this.pedidoRepository.delete(id);
  }
}
