import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches } from "class-validator";

export class dataValidatorsDTO  {
    @ApiProperty({
        example: '2024-01-01',
        description: 'A data inicial no formato YYYY-MM-DD',
        required: true,
        default: '2024-01-01'
      })
      @IsString()
      @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'A data deve estar no formato YYYY-MM-DD' })
      dataInicial: string;
    @ApiProperty({
        example: '2024-12-31',
        description: 'A data inicial no formato YYYY-MM-DD',
        required: true,
        default: '2024-12-31'
      })
      @IsString()
      @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'A data deve estar no formato YYYY-MM-DD' })
      dataFinal: string;
}