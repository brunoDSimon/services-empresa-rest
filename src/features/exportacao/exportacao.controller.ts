import { Controller, Get, Res, StreamableFile } from '@nestjs/common';
import { ExportacaoService } from './exportacao.service';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@ApiTags('exportacao')
@Controller('exportacao')
export class ExportacaoController {
  constructor(private readonly exportacaoService: ExportacaoService) {}


  @Get('pagamento-empresa-pdf')
  @ApiResponse({
    type:'file'
  })
  @ApiOperation({ summary: 'Baixar exemplo de PDF' })
  async pedidoArquivoPDF(
    @Res() res: Response
  ) {
    const pdf = await this.exportacaoService.gerarDados(1, "2024-04-01 00:00:00", "2024-04-19 23:59:59")
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="example.pdf"');
    res.send(pdf);
  }


  @Get('teste') 
  teste() {
    return this.exportacaoService.query(1, "2024-04-19 00:00:00", "2024-04-19 23:59:59")
  }
}
