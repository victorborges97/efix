import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class QueryPaginationDto {
    @ApiProperty({ required: false, minimum: 1, type: 'number' })
    @IsOptional()
    page?: number;

    @ApiProperty({ required: false, minimum: 3, maximum: 100, type: 'number' })
    @IsOptional()
    perPage?: number;
}

export function usePagination(pagination?: QueryPaginationDto) {
    const page = Number((pagination?.page ?? 1).toString());
    const perPage = Number((pagination?.perPage ?? 10).toString());

    const skip = (page - 1) * perPage;

    return {
        take: perPage,
        skip,
        perPage,
        page
    }
}