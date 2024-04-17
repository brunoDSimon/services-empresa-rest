import { ApiProperty } from "@nestjs/swagger";

export class CreateEmpresaDto {
    @ApiProperty({
        example: 'Empresa teste',
        required: true
    })
    name: string

    @ApiProperty({
        example: '77.877.238/0001-24',
        required: true,
        description: 'CNPJ sem caracteres especial'
    })
    documento: string

    @ApiProperty({
        example: '(55)99999-9999',
        required: false,
        description: 'celular ou telefone sem caracteres especial'
    })
    telefone: string

    @ApiProperty({
        example: '99999-999',
        required: false,
        description: 'CEP sem caracteres especial'
    })
    cep: string

    @ApiProperty({
        example: 'bairo XPTO',
        required: false,
        description: 'endereco'
    })
    endereco: string

    @ApiProperty({
        example: 'rua XPTO',
        required: false,
        description: 'logradouro'
    })
    logradouro: string

    @ApiProperty({
        example: '1111',
        required: false,
        description: 'numero da casa'
    })
    numero: number

    @ApiProperty({
        example: 'casa 1',
        required: false,
        description: 'locais proximo e ou sala'
    })
    complemento: string

}
