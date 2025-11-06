import { ApiProperty } from "@nestjs/swagger";

export class PaginationDto {
    @ApiProperty({ description: 'Number of items to skip', example: 0 })
    skip: number;

    @ApiProperty({ description: 'Number of items to fetch', example: 10 })
    limit: number;

    @ApiProperty({ description: 'Total number of items', example: 3 })
    totalItems: number;
}