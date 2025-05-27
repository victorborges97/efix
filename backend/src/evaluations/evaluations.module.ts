import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EvaluationsController } from './evaluations.controller';
import { EvaluationsService } from './evaluations.service';
import { EventsModule } from 'src/events/events.module';

@Module({
    imports: [EventsModule],
    controllers: [EvaluationsController],
    providers: [EvaluationsService, PrismaService],
})
export class EvaluationsModule { }
