import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { FilterSuggestionDto } from './dto/filter-suggestion.dto';

@Injectable()
export class SuggestionsService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateSuggestionDto) {
    return this.prisma.suggestion.create({
      data: {
        errorCode: data.errorCode,
        text: data.text,
      },
    });
  }

  async findAll(filters: FilterSuggestionDto) {
    if (filters?.errorCode) {
      return this.prisma.suggestion.findMany({ where: { errorCode: filters?.errorCode } });
    }
    return this.prisma.suggestion.findMany();
  }
}
