import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { FilterEvaluationsDto } from './dto/filter-evaluations.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryPaginationDto } from 'src/shared/dto/query-pagination.dto';
import { EvaluationResponse } from 'src/shared/interfaces/evaluation.response';
import { PaginatedDto } from 'src/shared/types/paginated.type';

@ApiTags('evaluations')
@Controller('evaluations')
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) { }

  @Post()
  @ApiOperation({
    summary: 'Create a new evaluation record',
    description: 'Cria um novo registro de avaliação com os dados fornecidos no corpo da requisição.',
  })
  @ApiBody({ type: CreateEvaluationDto })
  @ApiResponse({ status: 201, description: 'O registro foi criado com sucesso.', type: EvaluationResponse })
  @ApiResponse({ status: 404, description: 'Sugestão não encontrada.' })
  create(@Body() dto: CreateEvaluationDto) {
    return this.evaluationsService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all evaluation records',
    description: 'Retorna uma lista de avaliações com suporte a filtros e paginação opcionais.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de avaliações retornada com sucesso.',
    type: PaginatedDto(EvaluationResponse, 'EvaluationResponse')
  })
  findAll(@Query() params: FilterEvaluationsDto, @Query() pagination?: QueryPaginationDto) {
    return this.evaluationsService.getAll(params, pagination);
  }
}
