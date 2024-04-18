import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class AuthenticationDto{
    @ApiProperty({
        required: true,
        example: 'teste@teste.com'
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
}