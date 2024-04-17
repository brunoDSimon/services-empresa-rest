import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { PedidoService } from './pedido.service';
import { Pedido } from './entities/pedido.entity';
@ApiTags('pedido')
@Controller('pedido')
export class PedidoController {

  constructor(
    private readonly pedidoService: PedidoService,
  ) {}

  @Post()
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
  @ApiOkResponse({
  })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    return this.pedidoService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidoService.update(+id, updatePedidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidoService.remove(+id);
  }
}
