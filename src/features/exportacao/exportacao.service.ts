import {Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from '../pedido/entities/pedido.entity';
import { Repository } from 'typeorm';
import { Empresa } from '../empresa/entities/empresa.entity';


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
    ON pedido.empresaId = empresa.id `


    constructor(
        @InjectRepository(Pedido)
        private pedidoRepository: Repository<Pedido>,
        @InjectRepository(Empresa)
        private empresaRepository: Repository<Empresa>,
    ) {}


    public async gerarDados(idEmpresa: number, dataInicial:string, dataFinal:string) {
        let query =  this.baseExportacao.concat(` 
        WHERE  pedido.empresaId = ${idEmpresa} and
        pedido.dataFinalizacao IS NULL 
        AND pedido.createdAt BETWEEN  '${dataInicial}' AND '${dataFinal}';
        `)
        const rawData =  await this.pedidoRepository.query(query)   

        const dadosEmpresa = await this.empresaRepository.query(`SELECT * FROM EMPRESA WHERE id = ${idEmpresa}`)
        let valores = this.somarQtdeValor(rawData)
        return {pedidos:rawData, empresa:dadosEmpresa,valores}
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
