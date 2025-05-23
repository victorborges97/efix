import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EvaluationsController } from './evaluations.controller';
import { EvaluationsService } from './evaluations.service';

@Module({
    controllers: [EvaluationsController],
    providers: [EvaluationsService, PrismaService],
})
export class EvaluationsModule { }
