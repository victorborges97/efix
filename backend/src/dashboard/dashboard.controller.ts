import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { FilterEvaluationsDto, FilterEvaluationTotalDto } from './dto/filter-evaluations.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryPaginationDto } from 'src/shared/dto/query-pagination.dto';
import { Paginated, PaginatedDto } from 'src/shared/types/paginated.type';
import { SuggestionResponseAverage } from 'src/shared/interfaces/suggestion.response';
import { EvaluationTotalResponse } from 'src/shared/interfaces/evaluation.response';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly evaluationsService: DashboardService) { }

  @Get('summary')
  @ApiOperation({
    summary: 'Get total and average evaluation summary',
    description: 'Retorna a média total e o total geral das avaliações com base nos filtros fornecidos.',
  })
  @ApiResponse({
    status: 200,
    description: 'A resposta contém os valores totais e médios das avaliações filtradas.',
    type: EvaluationTotalResponse,
  })
  getAverageEvaluation(@Query() params: FilterEvaluationTotalDto) {
    return this.evaluationsService.getTotalAndAverageEvaluation(params);
  }

  @Get('details')
  @ApiOperation({
    summary: 'Get paginated average evaluations grouped by suggestion',
    description: 'Retorna a média das avaliações agrupadas por sugestão, com paginação suportada via parâmetros opcionais.',
  })
  @ApiResponse({
    status: 200,
    description: 'Resposta paginada contendo as médias das avaliações por sugestão.',
    type: PaginatedDto(SuggestionResponseAverage, 'SuggestionResponseAverage'),
  })
  findAllAverageBySuggestion(@Query() params: FilterEvaluationsDto, @Query() pagination?: QueryPaginationDto) {
    return this.evaluationsService.getAverageBySuggestion(params, pagination);
  }
}
