import {BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from '../pedido/entities/pedido.entity';
import { Repository } from 'typeorm';
import { Empresa } from '../empresa/entities/empresa.entity';
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as PDFDocument from 'pdfkit';
import { join } from 'path';
import  * as moment from 'moment';
import * as pdf from 'html-pdf';

@Injectable()
export class ExportacaoService {

    public baseExportacao: string = `
        SELECT
        pedido.remessa,
        pedido.quantidade,
        pedido.modelo,
        pedido.descricao,
        pedido.createdAt as dataEntrada,
        pedido.dataFinalizacao as dataTermino,
        empresa.name as nomeEmpresa,
        usuario.name as nomeFuncionario,
        (pedido.quantidade * pedido.valor) as valorTotal
        FROM PEDIDO
        INNER JOIN usuario
        ON pedido.usuarioId = usuario.id
        INNER JOIN empresa
        ON pedido.empresaId = empresa.id `;

    public options ={
        "format": "A4",
        "orientation": "portrait",
        "border": "0", 
        
    }
    constructor(
        @InjectRepository(Pedido)
        private pedidoRepository: Repository<Pedido>,
        @InjectRepository(Empresa)
        private empresaRepository: Repository<Empresa>,
    ) {}


    public async query(idEmpresa: number, dataInicial:string, dataFinal:string) {
      let query =  this.baseExportacao.concat(` 
      WHERE  pedido.empresaId = ${idEmpresa} and
      pedido.dataFinalizacao IS NULL 
      AND pedido.createdAt BETWEEN  '${dataInicial}' AND '${dataFinal}';
      `)
      const pedido =  await this.pedidoRepository.query(query)   

      const dadosEmpresa = await this.empresaRepository.findOne({where:{id:idEmpresa}})
      let valores = await this.somarQtdeValor(pedido)
      return {dadosEmpresa, pedido, valores,moment:moment, dataInicial, dataFinal}

    }

    public async gerarDados(idEmpresa: number, dataInicial:string, dataFinal:string) {
        let query =  this.baseExportacao.concat(` 
        WHERE  pedido.empresaId = ${idEmpresa} and
        pedido.dataFinalizacao IS NULL 
        AND pedido.createdAt BETWEEN  '${dataInicial}' AND '${dataFinal}';
        `)
        const pedido =  await this.pedidoRepository.query(query)   

        const dadosEmpresa = await this.empresaRepository.findOne({where:{id:idEmpresa}})
        let valores = await this.somarQtdeValor(pedido)
        const path = join(__dirname, '..', '..', 'templates', `index.ejs`);
        const template = fs.readFileSync(path, 'utf-8');
        const html = ejs.render(template, {dadosEmpresa, pedido, valores,moment:moment, dataInicial, dataFinal});
        return new Promise<Buffer>((resolve, reject) => {
          pdf.create(html).toBuffer((err, buffer) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(buffer);
              }
          });
      });
    }

    public somarQtdeValor(retorno) {
        if(retorno.length) {
          let quantidadeTotal = retorno.reduce((sum,item) =>{
            return sum + item.quantidade
          },0)
          let valorTotal = retorno.reduce((sum,item) =>{
            return sum + Number(item.valorTotal)
          },0)
          return {quantidadeTotal, valorTotal}
        }
    }
}
