import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNumber, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Role } from "src/shared/enums/role.enum";

export class CreateAuthDto {
    @ApiProperty({
        example: 'Bruno Simon',
        required: true
    })
    @IsString()
    name: string

    @ApiProperty({
        required: true,
        example: 'teste@gmail.com',
        description: 'E-mail valido'
    })
    @IsEmail()
    email: string


    @ApiProperty({
        required: true,
        example: 'Teste@1'
    })
    @IsStrongPassword({
        minLength: 6,
        minUppercase: 1,
    })
    password: string;

    @IsOptional()
    @IsEnum(Role)
    @ApiProperty({
        description: `role de acessos`,
        default: 1,
        enum:Role,
    })
    role: number
    
    @ApiProperty({
        example: 66293704061,
        required: true,
        maxLength:11,
        description: 'CPF valido'
    })
    @IsNumber()
    cpf:number
}
