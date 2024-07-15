import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { QueryRequired } from 'src/shared/decorators/queryRequired';
import { query } from 'express';
import { ApiBadRequestResponse, ApiBearerAuth, ApiDefaultResponse, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { dataValidatorsDTO } from 'src/shared/utils/date-validators';

@ApiTags('dashboards')
@Controller('dashboards')
export class DashboardsController {
  constructor(private readonly dashboardsService: DashboardsService) {}

  @Get('total-month')
  @ApiBearerAuth('access-token')
  @ApiQuery({type: dataValidatorsDTO})
  @ApiOkResponse({
    schema: {
      example: {
        "status": 1,
        "message": "Requisição efetuada com sucesso",
        "data": [
          {
            "valorTotal": "601.99",
            "quantidade": "2389"
          }
        ]
      }
    }
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: {
        "statusCode": 403,
        "timestamp": "2024-07-14T14:00:52.486Z",
        "path": "/dashboards/total-month?dataInicial=2024-01-01&dataFinal=2024-12-31",
        "message": {
          "message": "Forbidden resource",
          "error": "Forbidden",
          "statusCode": 403
        }
      }
    }
  })
  @ApiBadRequestResponse({
    schema: {
      example: {
        "statusCode": 400,
        "timestamp": "2024-07-14T14:02:00.396Z",
        "path": "/dashboards/total-month?dataFinal=2024-12-31",
        "message": {
          "message": "Missing required query param: 'dataInicial'",
          "error": "Bad Request",
          "statusCode": 400
        }
      }
    }
  })
  public totalMonth(
    @QueryRequired('dataInicial') dataInicial: string,
    @QueryRequired('dataFinal') dataFinal: string,
    @Query('apenasFechado') apenasFechado: boolean = false
  ) {
    return this.dashboardsService.consultarValorGanhoMes(dataInicial,dataFinal,apenasFechado)
  }

  @ApiOkResponse({
    schema: {
      example:{
        "status": 1,
        "message": "Requisição efetuada com sucesso",
        "data": [
          {
            "valorTotal": "295.00",
            "name": "Empresa teste"
          },
          {
            "valorTotal": "306.99",
            "name": "Luciana e Gustavo Limpeza ME"
          }
        ]
      }
    }
  })
  @Get('total-empresa')
  @ApiBearerAuth('access-token')
  @ApiQuery({type: dataValidatorsDTO})
  public totalValoresTotaisPorEmpresa(
    @QueryRequired('dataInicial') dataInicial: string,
    @QueryRequired('dataFinal') dataFinal: string,
    @Query('apenasFechado') apenasFechado: boolean = false
  ) {
    return this.dashboardsService.consultaValoresGanhoPorEmpresa(dataInicial,dataFinal,apenasFechado)
  }


  @Get('total-empresa-mes')
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    schema: {
      example: {
        "status": 1,
        "message": "Requisição efetuada com sucesso",
        "data": [
          {
            "mes": 1,
            "label": "Janeiro",
            "items": []
          },
          {
            "mes": 2,
            "label": "Fevereiro",
            "items": []
          },
          {
            "mes": 3,
            "label": "Março",
            "items": []
          },
          {
            "mes": 4,
            "label": "Abril",
            "items": []
          },
          {
            "mes": 5,
            "label": "Maio",
            "items": []
          },
          {
            "mes": 6,
            "label": "Junho",
            "items": []
          },
          {
            "mes": 7,
            "label": "Julho",
            "items": [
              {
                "valorTotal": "295.00",
                "name": "Empresa teste",
                "mes": 7
              },
              {
                "valorTotal": "306.99",
                "name": "Luciana e Gustavo Limpeza ME",
                "mes": 7
              }
            ]
          },
          {
            "mes": 8,
            "label": "Agosto",
            "items": []
          },
          {
            "mes": 9,
            "label": "Setembro",
            "items": []
          },
          {
            "mes": 10,
            "label": "Outubro",
            "items": []
          },
          {
            "mes": 11,
            "label": "Novembro",
            "items": []
          },
          {
            "mes": 12,
            "label": "Dezembro",
            "items": []
          }
        ]
      }
    }
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: {
        "statusCode": 403,
        "timestamp": "2024-07-14T14:00:52.486Z",
        "path": "/dashboards/total-empresa-mes?dataInicial=2024-01-01&dataFinal=2024-12-31",
        "message": {
          "message": "Forbidden resource",
          "error": "Forbidden",
          "statusCode": 403
        }
      }
    }
  })
  @ApiBadRequestResponse({
    schema: {
      example: {
        "statusCode": 400,
        "timestamp": "2024-07-14T14:02:00.396Z",
        "path": "/dashboards/total-empresa-mes?dataFinal=2024-12-31",
        "message": {
          "message": "Missing required query param: 'dataInicial'",
          "error": "Bad Request",
          "statusCode": 400
        }
      }
    }
  })
  @ApiQuery({type: dataValidatorsDTO})
  public totalValoresTotaisPorEmpresaMes(
    @QueryRequired('dataInicial') dataInicial: string,
    @QueryRequired('dataFinal') dataFinal: string,
    @Query('apenasFechado') apenasFechado: boolean = false
  ) {
    return this.dashboardsService.consultaValoresGanhoPorEmpresaPorMes(dataInicial,dataFinal,apenasFechado)
  }


}
