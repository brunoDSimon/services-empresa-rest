import { Controller, Get, Post, Body, Patch, Param, Delete, DefaultValuePipe } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UsuarioService } from './usuario.service';
import { QueryRequired } from 'src/shared/decorators/queryRequired';

@ApiTags('usuario')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

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
  @Get()
  findAll(
    @QueryRequired('page', new DefaultValuePipe(0)) page: number = 0,
    @QueryRequired('limit', new DefaultValuePipe(10)) limit: number = 10,
  ): Promise<any> {
    return this.usuarioService.findAll(page,limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
