import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { FilterSuggestionDto } from './dto/filter-suggestion.dto';
import { Paginated, useMetaPaginated } from 'src/shared/types/paginated.type';
import { QueryPaginationDto, usePagination } from 'src/shared/dto/query-pagination.dto';
import { SuggestionResponse } from 'src/shared/interfaces/suggestion.response';
import { useSuggestionFilter } from 'src/shared/hooks/use-filters';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class SuggestionsService {
  constructor(private prisma: PrismaService, private eventsService: EventsGateway) { }

  async create(data: CreateSuggestionDto): Promise<SuggestionResponse> {
    const errorCode = await this.prisma.suggestion.findUnique({
      where: {
        errorCode: data.errorCode,
      }
    })
    if (errorCode !== null) throw new BadRequestException("Suggestion already registered.");

    const created = await this.prisma.suggestion.create({
      data: {
        errorCode: data.errorCode,
        text: data.text,
      },
    });

    this.eventsService.notify<SuggestionResponse>("suggestion:created", created);
    return created;
  }

  async findAll(filters: FilterSuggestionDto, pagination?: QueryPaginationDto) {
    const { skip, take } = usePagination(pagination);
    const where = useSuggestionFilter(filters);
    const data = await this.prisma.suggestion.findMany({
      skip,
      where,
      take,
    });
    const totalCount = await this.prisma.suggestion.count({
      where,
    });
    const meta = useMetaPaginated(totalCount, pagination);

    return {
      data,
      meta,
    } as Paginated<SuggestionResponse>;
  }
}
