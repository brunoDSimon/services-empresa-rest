import { Controller, Get, Post, Body, Patch, Param, Delete, DefaultValuePipe, Query } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EmpresaService } from './empresa.service';
import { QueryRequired } from 'src/shared/decorators/queryRequired';


@ApiTags('empresas')
@Controller('empresas')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  @ApiBearerAuth('access-token')
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresaService.create(createEmpresaDto);
  }

  @Get()
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    schema:{
      example: [
        {
          "id": 1,
          "name": "Empresa teste",
          "documento": "77877238000124",
          "numero": 1111,
          "createdAt": "2024-04-17T19:48:17.777Z",
          "updatedAt": "2024-04-17T19:48:17.777Z",
          "telefone": "999999999",
          "cep": "99999999",
          "endereco": "bairo XPTO",
          "logradouro": "rua XPTO",
          "complemento": "casa 1"
        }
      ]
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
  findAll(
    @QueryRequired('page', new DefaultValuePipe(0)) page: number = 0,
    @QueryRequired('limit', new DefaultValuePipe(10)) limit: number = 10,
  ): Promise<any> {
    return this.empresaService.findAll(page, limit);
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  findOne(@Param('id') id: string) {
    return this.empresaService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresaService.update(+id, updateEmpresaDto);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  remove(@Param('id') id: string) {
    return this.empresaService.remove(+id);
  }
}
