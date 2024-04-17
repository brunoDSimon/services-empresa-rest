import { ApiProperty } from "@nestjs/swagger";
import { Empresa } from "src/features/empresa/entities/empresa.entity";
import { Usuario } from "src/features/usuario/entities/usuario.entity";

export class CreatePedidoDto {
    @ApiProperty({
        description: 'nome ou numero da remessa de trabalho',
        example: 'R10001',
        required:true
    })
    remessa:string

    @ApiProperty({
        description: 'valor final a ser cobrado por unidade',
        example: 0.59,
        required:true
    })
    valor:number

    @ApiProperty({
        description: 'Quantidade total a ser produzido',
        example: 10,
        required:true
    })
    quantidade:number

    @ApiProperty({
        description: 'Modelo de produção',
        example: 'A000B21',
        required:true
    })
    modelo:string

    @ApiProperty({
        description: 'Cor ou mais detalhes',
        example: 'Couro cor bege',
        required:false
    })
    descricao:string

    @ApiProperty({
        description: 'data de entrega',
        required: false,
        example: new Date().toISOString()
    })
    dataFinalizacao:Date

    @ApiProperty({
        description: 'ID da empresa do pedido aberto',
        required: true,
        example: 1
    })
    empresa:Empresa

    @ApiProperty({
        description: 'ID da usuario do usuario que vai produzir',
        required: true,
        example: 1
    })
    usuario:Usuario


}
