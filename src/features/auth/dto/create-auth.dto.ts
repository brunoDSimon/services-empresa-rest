import { IsEmail, IsEnum, IsNumber, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Role } from "src/shared/enums/role.enum";

export class CreateAuthDto {
    @IsString()
    name: string
    @IsEmail()
    email: string
    @IsStrongPassword({
        minLength: 6,
        minUppercase: 1,
    })
    password: string;

    @IsOptional()
    @IsEnum(Role)
    role: number

    @IsNumber()
    cpf:number
}
