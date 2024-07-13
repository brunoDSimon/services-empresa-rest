import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { PedidoService } from './pedido.service';
import { Pedido } from './entities/pedido.entity';
import { query } from 'express';
import { QueryRequired } from 'src/shared/decorators/queryRequired';
@ApiTags('pedido')
@Controller('pedido')
export class PedidoController {

  constructor(
    private readonly pedidoService: PedidoService,
  ) {}

  @Post()
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
   schema: {
    example:{
      "remessa": "R10001",
      "valor": "0.59",
      "quantidade": 10,
      "modelo": "A000B21",
      "descricao": "Couro cor bege",
      "dataFinalizacao": "2024-04-17T20:21:03.149Z",
      "empresa": 1,
      "usuario": 3,
      "id": 5,
      "createdAt": "2024-04-17T20:21:36.390Z",
      "updatedAt": "2024-04-17T20:21:36.390Z"
  }
   }
  })
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidoService.create(createPedidoDto);
  }

  @Get()
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    schema: {
      example: [{
        "id": 4,
        "remessa": "R10001",
        "quantidade": 10,
        "modelo": "A000B21",
        "descricao": "Couro cor bege",
        "dataFinalizacao": "2024-04-17T20:04:10.000Z",
        "empresaId": 1,
        "usuarioId": 3,
        "nomeEmpresa": "Empresa teste",
        "nomeUsuario": "Usuario teste 01"
      }],
    }
  })
  @ApiQuery({
    name: 'page',
    required:true,
    example: 0,
    type:'number',
    
    })
  @ApiQuery({
    name: 'limit',
    required:true,
    example: 10,
    type:'number',
    })
    @ApiQuery({
      name: 'empresaId',
      required:false,
      example: 0,
      type:'number',
      
      })
    @ApiQuery({
      name: 'usuarioId',
      required:false,
      example: 10,
      type:'number',
      })
  findAll(
    @QueryRequired('page', new DefaultValuePipe(0)) page: number = 0,
    @QueryRequired('limit', new DefaultValuePipe(10)) limit: number = 10,
    @Query('order',new DefaultValuePipe("ASC")) order: "ASC" | "DESC",
    @Query('empresaId') empresaId: number = null,
    @Query('usuarioId') usuarioId: number = null,
  ) {
    return this.pedidoService.findAll(page,limit, empresaId, usuarioId, order)
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  findOne(@Param('id') id: string) {
    return this.pedidoService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidoService.update(+id, updatePedidoDto);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  remove(@Param('id') id: string) {
    return this.pedidoService.remove(+id);
  }
}
