import { BadRequestException, Controller, DefaultValuePipe, Get, Res, StreamableFile } from '@nestjs/common';
import { ExportacaoService } from './exportacao.service';
import { ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { QueryRequired } from 'src/shared/decorators/queryRequired';

@ApiTags('exportacao')
@Controller('exportacao')
export class ExportacaoController {
  constructor(private readonly exportacaoService: ExportacaoService) {}


  @Get('empresa/pdf')
  @ApiResponse({
    type:'file'
  })
  @ApiQuery({
    name: 'empresaId',
    required:true,
    example: 1,
    type:'number',
    
    })
  @ApiQuery({
    name: 'dataInicial',
    required:true,
    example: "2024-04-19 00:00:00",
    type:'date',
  })
  @ApiQuery({
    name: 'dataFinal',
    required:true,
    example: "2024-04-19 23:59:59",
    type:'date',
  })
  @ApiOperation({ summary: 'Baixar PDF de fechamento de mês' })
  async pedidoArquivoPDF(
    @Res() res: Response,
    @QueryRequired('empresaId', new DefaultValuePipe(0)) empresaId:number = 0,
    @QueryRequired('dataInicial', new DefaultValuePipe(Date)) dataInicial: Date,
    @QueryRequired('dataFinal', new DefaultValuePipe(Date)) dataFinal:Date
  ) {
    const pdf = await this.exportacaoService.gerarDadosPDF(empresaId, dataInicial, dataFinal)
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="example.pdf"');
    res.send(pdf);
  }

  @Get('empresa/csv')
  @ApiOperation({ summary: 'Baixar CSV de fechamento de mês' })
  @ApiResponse({
    type:'file'
  })
  @ApiQuery({
    name: 'empresaId',
    required:true,
    example: 1,
    type:'number',
    
    })
  @ApiQuery({
    name: 'dataInicial',
    required:true,
    example: "2024-04-19 00:00:00",
    type:'date',
  })
  @ApiQuery({
    name: 'dataFinal',
    required:true,
    example: "2024-04-19 23:59:59",
    type:'date',
  })
  async pedidoArquivoCSV(
    @Res() res: Response,
    @QueryRequired('empresaId', new DefaultValuePipe(0)) empresaId:number = 0,
    @QueryRequired('dataInicial', new DefaultValuePipe(Date)) dataInicial: Date,
    @QueryRequired('dataFinal', new DefaultValuePipe(Date)) dataFinal:Date
  ) {
    try {
      const filePath = await this.exportacaoService.gerarDadosCSV(empresaId, dataInicial, dataFinal);
      return res.download(filePath);
    } catch (error) {
      throw new BadRequestException('Não foi possivel gerar o arquivo')
    }
  }





  @Get('empresa/xlsx') 
  @ApiOperation({ summary: 'Baixar Excel de fechamento de mês' })
  @ApiResponse({
    type:'file'
  })
  @ApiQuery({
    name: 'empresaId',
    required:true,
    example: 1,
    type:'number',
    
    })
  @ApiQuery({
    name: 'dataInicial',
    required:true,
    example: "2024-04-19 00:00:00",
    type:'date',
  })
  @ApiQuery({
    name: 'dataFinal',
    required:true,
    example: "2024-04-19 23:59:59",
    type:'date',
  })
  public async pedidoArquivoXLSX(
    @Res() res: Response,
    @QueryRequired('empresaId', new DefaultValuePipe(0)) empresaId:number = 0,
    @QueryRequired('dataInicial', new DefaultValuePipe(Date)) dataInicial: Date,
    @QueryRequired('dataFinal', new DefaultValuePipe(Date)) dataFinal:Date
  ) {
    try {
      const buffer = await this.exportacaoService.generateExcel(empresaId, dataInicial, dataFinal) 
      // Retorne o arquivo Excel para download
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=dados.xlsx');
      res.send(buffer);
    } catch (error) {
      throw new BadRequestException('Erro ao gerar o arquivo Excel.')
    }
  }


  @Get('query') 
  @ApiOperation({ summary: 'Query com dados de retorno' })
  teste() {
    return this.exportacaoService.query(1, "2024-04-01 00:00:00", "2024-04-19 23:59:59")
  }

  
}
