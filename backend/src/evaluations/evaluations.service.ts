import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { FilterEvaluationsDto } from './dto/filter-evaluations.dto';
import { QueryPaginationDto, usePagination } from 'src/shared/dto/query-pagination.dto';
import { Paginated, useMetaPaginated } from 'src/shared/types/paginated.type';
import { EvaluationResponse } from 'src/shared/interfaces/evaluation.response';
import { useEvaluationFilter } from 'src/shared/hooks/use-filters';

@Injectable()
export class EvaluationsService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateEvaluationDto): Promise<EvaluationResponse> {
    const errorCode = await this.prisma.suggestion.findUnique({
      where: {
        errorCode: data.errorCode,
      }
    })

    if (!errorCode) throw new NotFoundException("Suggestion not found!")

    return this.prisma.evaluation.create({
      data: {
        clientCode: data.clientCode,
        evaluation: data.evaluation,
        comment: data.comment,
        errorCode: data.errorCode,
        suggestionId: errorCode.id,
      }
    });
  }

  async getAll(params: FilterEvaluationsDto, pagination?: QueryPaginationDto) {
    const where = useEvaluationFilter(params);
    const { skip, take } = usePagination(pagination);

    const data: EvaluationResponse[] = await this.prisma.evaluation.findMany({
      skip,
      where,
      take,
    });

    const totalCount = await this.prisma.evaluation.count({
      where
    });

    const meta = useMetaPaginated(totalCount, pagination);

    return {
      data,
      meta,
    } as Paginated<EvaluationResponse>;
  }
}

