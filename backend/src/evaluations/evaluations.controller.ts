import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { FilterEvaluationsDto } from './dto/filter-evaluations.dto';

@Controller('evaluations')
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) { }

  @Post()
  create(@Body() dto: CreateEvaluationDto) {
    return this.evaluationsService.create(dto);
  }

  @Get()
  findAll(@Query() params: FilterEvaluationsDto) {
    return this.evaluationsService.getEvaluationsFiltered(params);
  }
}
