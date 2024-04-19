import { Controller, Get, StreamableFile } from '@nestjs/common';
import { ExportacaoService } from './exportacao.service';
import { ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { join } from 'path';

@ApiTags('exportacao')
@Controller('exportacao')
export class ExportacaoController {
  constructor(private readonly exportacaoService: ExportacaoService) {}


  @Get('pagamento-empresa-pdf')
  pedidoArquivoPDF() {
    return this.exportacaoService.gerarDados(1, "2024-04-01 00:00:00", "2024-04-19 23:59:59")
  }
}
