import { ApiProperty } from "@nestjs/swagger";

export class PageDTO {
    @ApiProperty({default: 0, required: true})
    page: number
    @ApiProperty({default: 10, required: false})
    limit: Number
}