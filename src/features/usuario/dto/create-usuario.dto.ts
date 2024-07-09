import { ApiProperty } from "@nestjs/swagger";

export class CreateUsuarioDto {
    @ApiProperty({
        example: '(55)99999-9999',
        required: false,
        description: 'celular ou telefone sem caracteres especial'
    })
    telefone:string

    @ApiProperty({
        example: 'dcta478j-196l-03fm-t6gh-4298er7845m2',
        required: false,
        description: 'chave pix '
    })
    chavepix:string

    @ApiProperty({
        example: '627.572.620-25',
        required: true,
        description: 'CNPJ sem caracteres especial'
    })
    cpf:string

    @ApiProperty({
        example: 'Empresa teste',
        required: true
    })
    name:string

    @ApiProperty({
        required:true,
        default:true,
        example: true
    })
    active:boolean
}
