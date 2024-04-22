import {BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from '../pedido/entities/pedido.entity';
import { Repository } from 'typeorm';
import { Empresa } from '../empresa/entities/empresa.entity';
import * as ejs from 'ejs';
import * as fs from 'fs';
import { join } from 'path';
import  * as moment from 'moment';
import * as pdf from 'html-pdf';
import { createObjectCsvWriter } from 'csv-writer';
import * as xlsxPopulate from 'xlsx-populate';

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
        pedido.valor as valorUnidade,
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
      return {dadosEmpresa, pedido, valores, dataInicial, dataFinal}

    }

    public async gerarDadosPDF(idEmpresa: number, dataInicial:Date, dataFinal:Date) {
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
        try {
          return new Promise<Buffer>((resolve, reject) => {
            pdf.create(html).toBuffer((err, buffer) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(buffer);
                }
            });
          });
        } catch (error) {
          throw new BadRequestException(error)
        }
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

    public async gerarDadosCSV(idEmpresa: number, dataInicial:Date, dataFinal:Date) {
      let query =  this.baseExportacao.concat(` 
        WHERE  pedido.empresaId = ${idEmpresa} and
        pedido.dataFinalizacao IS NULL 
        AND pedido.createdAt BETWEEN  '${dataInicial}' AND '${dataFinal}';
        `)
        const pedido =  await this.pedidoRepository.query(query)
        const tratado = await this.tratarDadosParaCsv(pedido)
        const csvWriter = createObjectCsvWriter({
          path: 'output.csv',
          header: Object.keys(tratado[0]).map(key => ({ id: key, title: key })),
          encoding: 'utf-8'
        });
  
      await csvWriter.writeRecords(tratado);
  
      return 'output.csv';
    }

  public tratarDadosParaCsv(dados) {
    if(dados.length) {
      dados.forEach(element => {
        if(element.dataEntrada != null) {
          element.dataEntrada = moment(element.dataEntrada).format( 'DD/MM/YYYY');
        }
        if(element.dataTermino != null) {
          element.dataTermino = moment(element.dataTermino).format( 'DD/MM/YYYY');
        }
      });
    }
    return dados
  }

  async generateExcel(idEmpresa: number, dataInicial:Date, dataFinal:Date) {
    let query =  this.baseExportacao.concat(` 
    WHERE  pedido.empresaId = ${idEmpresa} and
    pedido.dataFinalizacao IS NULL 
    AND pedido.createdAt BETWEEN  '${dataInicial}' AND '${dataFinal}';
    `)
    const pedido =  await this.pedidoRepository.query(query)   
    const tratado = await this.tratarDadosParaCsv(pedido)
    const dadosEmpresa = await this.empresaRepository.findOne({where:{id:idEmpresa}})
    let valores = await this.somarQtdeValor(pedido);
   
    const workbook = await xlsxPopulate.fromBlankAsync();
    const sheet = workbook.sheet(0);
    // Adiciona o logotipo da empresa e informações de contato
    // Você pode adicionar o logotipo e informações de contato como desejado
    sheet.cell('A1').value('LOGOTIPO DA EMPRESA');
    sheet.cell('A2').value('Informações de Contato');
    sheet.cell('A3').value('Endereço: ' + dadosEmpresa.endereco + '' + dadosEmpresa.logradouro + '' + dadosEmpresa.numero);
    sheet.cell('A4').value('Telefone: ' + dadosEmpresa.telefone);
    sheet.cell('A5').value('E-mail: ' + 'companyInfo.email');

    // Adiciona os detalhes da empresa
    sheet.cell('A7').value('DADOS DA EMPRESA');
    sheet.cell('A8').value('Nome da Empresa:');
    sheet.cell('B8').value('companyInfo.name');
    sheet.cell('A9').value('Endereço:');
    sheet.cell('B9').value('companyInfo.address');
    sheet.cell('A10').value('Telefone:');
    sheet.cell('B10').value('companyInfo.phone');
    sheet.cell('A11').value('E-mail:');
    sheet.cell('B11').value('companyInfo.email');

    // Adiciona os valores totais
    sheet.cell('A13').value('VALORES TOTAIS');
    sheet.cell('A14').value('Total de bolsas produzidas:');
    sheet.cell('B14').value(valores.quantidadeTotal);
    sheet.cell('A15').value('Total:');
    sheet.cell('B15').value(valores.valorTotal);
    // Adicione outras informações de totais conforme necessário

    // Adiciona os cabeçalhos dos dados dinâmicos
    sheet.cell('A17').value('DADOS DINÂMICOS');
    // Adicione os dados dinâmicos
    tratado.forEach((row, rowIndex) => {
      Object.keys(row).forEach((key, colIndex) => {
        sheet.cell(rowIndex + 18, colIndex + 1).value(row[key]);
      });
    });

    // Converte o workbook para um buffer e o retorna
    const buffer = await workbook.outputAsync();
    return buffer;
  }
}
