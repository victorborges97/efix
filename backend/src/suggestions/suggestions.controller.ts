import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { FilterSuggestionDto } from './dto/filter-suggestion.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryPaginationDto } from 'src/shared/dto/query-pagination.dto';
import { SuggestionResponse } from 'src/shared/interfaces/suggestion.response';
import { PaginatedDto } from 'src/shared/types/paginated.type';

@ApiTags('suggestions')
@Controller('suggestions')
export class SuggestionsController {
  constructor(private readonly suggestionsService: SuggestionsService) { }

  @Post()
  @ApiOperation({
    summary: 'Create a new suggestion record',
    description: 'Cria um novo registro de sugestão com os dados fornecidos no corpo da requisição.',
  })
  @ApiBody({ type: CreateSuggestionDto })
  @ApiResponse({ status: 201, description: 'O registro foi criado com sucesso.', type: SuggestionResponse })
  @ApiResponse({ status: 400, description: 'Dados inválidos no corpo da requisição.' })
  @ApiResponse({ status: 400, description: 'Sugestão já está cadastrada.' })
  create(@Body() createSuggestionDto: CreateSuggestionDto) {
    return this.suggestionsService.create(createSuggestionDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get paginated list of suggestions',
    description: 'Retorna uma lista paginada de sugestões com filtros opcionais e paginação.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista paginada de sugestões retornada com sucesso.',
    type: PaginatedDto(SuggestionResponse, 'SuggestionResponse'),
  })
  findAll(@Query() filters: FilterSuggestionDto, @Query() pagination?: QueryPaginationDto) {
    return this.suggestionsService.findAll(filters, pagination);
  }
}
