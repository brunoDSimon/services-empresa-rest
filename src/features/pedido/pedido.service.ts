import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
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
  private readonly logger = new Logger(PedidoService.name);

  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
    private readonly usuarioService: UsuarioService,
    private readonly empresaService: EmpresaService,
  ) {
  }


  async create(createPedidoDto: CreatePedidoDto) {

    let usuario = await this.usuarioService.findOne(+createPedidoDto.usuario)
    let empresa = await this.empresaService.findOne(+createPedidoDto.empresa)
    if( usuario && empresa) {
      this.pedidoRepository.create(createPedidoDto);
      return this.pedidoRepository.save(createPedidoDto);
    } else {
      if(!usuario) {
        throw new BadRequestException('usuario invalidos')
      }
      if(!empresa) {
        throw new BadRequestException('empresa invalidos')
      }
    }
  }

  async findAll(page: number, limit:number ,empresaId: number, usuarioId: number,  order: 'ASC' | 'DESC' = 'ASC' ) {
   
 
    let base = `
    SELECT 
    pedido.id, 
    pedido.remessa, 
    pedido.quantidade, 
    pedido.modelo, 
    pedido.descricao, 
    pedido.dataFinalizacao, 
    pedido.dataFinalizacao as dataCriacao,
    pedido.empresaId, 
    pedido.usuarioId,
    empresa.name as nomeEmpresa,
    usuario.name as nomeUsuario
    FROM PEDIDO 
    INNER JOIN usuario
    ON pedido.usuarioId = usuario.id
    INNER JOIN empresa
    ON pedido.empresaId = empresa.id `

    let where;
    if(empresaId != null  && usuarioId == null) {
      where = base.concat(`WHERE empresaId = ${empresaId}`);
      base = where;
    }
    if(empresaId ==null && usuarioId !=null ) {
      where = base.concat(`WHERE usuarioId = ${usuarioId}`);
      base = where;
    }
    if(empresaId !=null && usuarioId !=null ) {
      where = base.concat(`WHERE empresaId = ${empresaId} and usuarioId = ${usuarioId}`);
      base = where;
    }
    let paginate = `
    order by pedido.id = 'ASC'
    LIMIT  ${limit}
    OFFSET  ${page}
    `
    let query = base.concat(paginate)

    const rawData =  this.pedidoRepository.query(query)   

    return rawData
   
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
    try {
      this.pedidoRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error)
    }

  }
}
