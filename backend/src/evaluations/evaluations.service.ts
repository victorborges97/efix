import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { Prisma } from '@prisma/client';
import { FilterEvaluationsDto } from './dto/filter-evaluations.dto';

@Injectable()
export class EvaluationsService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateEvaluationDto) {
    return this.prisma.evaluation.create({
      data: {
        clientCode: data.clientCode,
        date: new Date(data.date),
        evaluation: data.evaluation,
        comment: data.comment,
        errorCode: data.errorCode,
        suggestion: { connect: { errorCode: data.errorCode } },
      }
    });
  }

  // Avaliação média total (positivas/total)
  async getAverageEvaluation() {
    const total = await this.prisma.evaluation.count();
    const positives = await this.prisma.evaluation.count({ where: { evaluation: true } });
    return positives / total;
  }

  // Avaliação média por sugestão (agrupado por errorCode)
  async getAverageBySuggestion() {
    return this.prisma.evaluation.groupBy({
      by: ['errorCode'],
      _avg: { id: true },
    });
  }

  // Avaliações filtradas por data e outros
  async getEvaluationsFiltered(params: FilterEvaluationsDto) {
    const where: Prisma.EvaluationWhereInput = {};
    if (params.from || params.to) {
      where.date = {};
      if (params.from) where.date.gte = params.from;
      if (params.to) where.date.lte = params.to;
    }
    if (params.errorCode) where.errorCode = params.errorCode;

    return this.prisma.evaluation.findMany({ where });
  }
}
