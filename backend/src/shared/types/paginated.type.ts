import { Type } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { QueryPaginationDto, usePagination } from "src/shared/dto/query-pagination.dto";

export class MetaPaginated {
    @ApiProperty()
    page: number;
    @ApiProperty()
    perPage: number;
    @ApiProperty()
    total: number;
    @ApiProperty()
    totalPages: number;
}

export class Paginated<T> {
    @ApiProperty()
    data: T[];

    @ApiProperty({ type: MetaPaginated })
    meta: MetaPaginated;
};

export function PaginatedDto<T>(classRef: new () => T, name: string) {
    class PaginatedClass {
        @ApiProperty({ type: [classRef] })
        data: T[];

        @ApiProperty()
        meta: MetaPaginated;
    }

    Object.defineProperty(PaginatedClass, 'name', {
        value: `Paginated${name}`,
    });

    return PaginatedClass;
}

export function useMetaPaginated(totalCount: number, pagination?: QueryPaginationDto) {
    const { page, perPage } = usePagination(pagination);
    return {
        page,
        perPage,
        total: totalCount,
        totalPages: Math.ceil(totalCount / perPage),
    } as MetaPaginated;
}