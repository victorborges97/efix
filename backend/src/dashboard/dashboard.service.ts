import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FilterEvaluationsDto, FilterEvaluationTotalDto } from './dto/filter-evaluations.dto';
import { QueryPaginationDto, usePagination } from 'src/shared/dto/query-pagination.dto';
import { Paginated, useMetaPaginated } from 'src/shared/types/paginated.type';
import { useEvaluationFilter } from 'src/shared/hooks/use-filters';
import { SuggestionResponseAverage } from 'src/shared/interfaces/suggestion.response';
import { EvaluationTotalResponse } from 'src/shared/interfaces/evaluation.response';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) { }

  /**
   * @description Avaliação média total (positivas/total)
   * @param params 
   * @returns 
   */
  async getTotalAndAverageEvaluation(params: FilterEvaluationTotalDto): Promise<EvaluationTotalResponse> {
    const where = useEvaluationFilter(params);

    const total = await this.prisma.evaluation.count({
      where
    });
    const positives = await this.prisma.evaluation.count({
      where: { ...where, evaluation: true },
    });
    const average = total > 0 ? positives / total : 0;
    return {
      total, average
    } as EvaluationTotalResponse;
  }

  /**
   * @description Avaliação média por sugestão (agrupado por errorCode)
   * @param params
   * @param pagination 
   * @returns 
   */
  async getAverageBySuggestion(params: FilterEvaluationsDto, pagination?: QueryPaginationDto): Promise<Paginated<SuggestionResponseAverage>> {
    const where = useEvaluationFilter(params);

    const { skip, take } = usePagination(pagination);

    const result = await this.prisma.suggestion.findMany({
      skip,
      take,
      include: {
        evaluations: {
          where,
          select: { evaluation: true }
        },
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    const averages = result.map(s => {
      const total = s.evaluations.length;
      const positives = s.evaluations.filter(e => e.evaluation).length;
      return {
        suggestion: { id: s.id, errorCode: s.errorCode, text: s.text },
        averageEvaluation: total > 0 ? positives / total : 0,
        totalEvaluations: total,
        positiveEvaluations: positives,
      } as SuggestionResponseAverage;
    });

    const totalCount = await this.prisma.suggestion.count();

    const meta = useMetaPaginated(totalCount, pagination);

    return {
      data: averages,
      meta,
    } as Paginated<SuggestionResponseAverage>;
  }
}
