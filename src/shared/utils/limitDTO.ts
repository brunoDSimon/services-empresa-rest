import { ApiProperty } from "@nestjs/swagger";

export class LimitiDTO {
    @ApiProperty({default: 10, required: false})
    limit: Number
}