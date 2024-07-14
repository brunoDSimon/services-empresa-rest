import { ApiProperty } from "@nestjs/swagger";

export class pedidoValidators  {
    @ApiProperty({default: false, required: false})
    apenasFechado: boolean 
}