import {  BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { EmpresaService } from '../empresa/empresa.service';
import { UsuarioService } from '../usuario/usuario.service';
import { Pedido } from '../pedido/entities/pedido.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';
const momentTimezone = require('moment-timezone');
@Injectable()
export class DashboardsService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
    private readonly usuarioService: UsuarioService,
    private readonly empresaService: EmpresaService,
  ) {

  }

  async convertDate(dataInicial, dataFinal) {
    const dateI = new Date(`${dataInicial}T00:00:00`);
    const dateF = new Date(`${dataFinal}T23:59:59`);
    return { dateI, dateF };
  }
  

  public async  consultarValorGanhoMes(dataInicial, dataFinal, apenasFechados: boolean = false) {
    const dates = await this.convertDate(dataInicial, dataFinal);
    let type = apenasFechados ? 'IS NOT NULL' : 'IS NULL';
    let query = `
      SELECT sum(pedido.valor * pedido.quantidade) AS valorTotal,
            sum(pedido.quantidade) AS quantidade
      FROM pedido
      WHERE pedido.createdAt BETWEEN ? AND ?
        AND pedido.dataFinalizacao ${type};
    `;

    try {
      const rawData = await this.pedidoRepository.query(query, [dates.dateI, dates.dateF]);
      return rawData;

    } catch (error) {
      throw new InternalServerErrorException()
    }
    

  }

  public async consultaValoresGanhoPorEmpresa(dataInicial, dataFinal, apenasFechados: boolean = false) {
    const dates = await this.convertDate(dataInicial, dataFinal);
    let type = apenasFechados ? 'IS NOT NULL' : 'IS NULL';

    let query = `
    SELECT 
      SUM(pedido.valor * pedido.quantidade) AS valorTotal, 
      empresa.name 
    FROM 
        pedido 
    INNER JOIN 
        empresa 
    ON 
        pedido.empresaId = empresa.id
    WHERE 
        pedido.createdAt BETWEEN ? AND ?
        AND pedido.dataFinalizacao ${type} 
    GROUP BY 
        empresa.name;
    `
    try {
      const rawData = await this.pedidoRepository.query(query, [dates.dateI, dates.dateF]);
      return rawData;

    } catch (error) {
      throw new InternalServerErrorException()
    }
  }


  public async consultaValoresGanhoPorEmpresaPorMes(dataInicial, dataFinal, apenasFechados: boolean = false) {
    const dates = await this.convertDate(dataInicial, dataFinal);
    let type = apenasFechados ? 'IS NOT NULL' : 'IS NULL';

    let query = `
    SELECT 
      SUM(pedido.valor * pedido.quantidade) AS valorTotal, 
      empresa.name,
      extract(month FROM pedido.createdAt) as mes
    FROM 
      pedido 
    INNER JOIN 
      empresa 
    ON 
      pedido.empresaId = empresa.id
    WHERE 
      pedido.createdAt BETWEEN ? AND ? 
      AND pedido.dataFinalizacao ${type}
    GROUP BY 
      empresa.name, extract(month FROM pedido.createdAt) ;
    `
    try {
      const rawData = await this.pedidoRepository.query(query, [dates.dateI, dates.dateF]);
      
      return this.tratarLista(rawData);

    } catch (error) {
      throw new InternalServerErrorException()
    }
  }


  public tratarLista(response: any) {
    let dados: any = Object.values(JSON.parse(JSON.stringify(response)))
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    let map = []
    for (let index = 0; index < 12; index++) {
      map.push({mes:index +1, label:meses[index] },); 
    }
   
    map.forEach((element, index) => {
      let mesesIguais = dados.filter(t => t.mes == element.mes)
      element[`items`] = mesesIguais.length >0 ? mesesIguais : []
    
    })
    return map
  }
}
