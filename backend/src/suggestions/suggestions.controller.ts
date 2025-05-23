import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { FilterSuggestionDto } from './dto/filter-suggestion.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

@ApiTags('suggestions')
@Controller('suggestions')
export class SuggestionsController {
  constructor(private readonly suggestionsService: SuggestionsService) { }

  @Post()
  @ApiBody({ type: CreateSuggestionDto })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createSuggestionDto: CreateSuggestionDto) {
    return this.suggestionsService.create(createSuggestionDto);
  }

  @Get()
  findAll(@Query() filters: FilterSuggestionDto) {
    return this.suggestionsService.findAll(filters);
  }
}
