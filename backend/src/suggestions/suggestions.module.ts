import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SuggestionsService } from './suggestions.service';
import { SuggestionsController } from './suggestions.controller';
import { EventsModule } from 'src/events/events.module';

@Module({
    imports: [EventsModule],
    controllers: [SuggestionsController],
    providers: [SuggestionsService, PrismaService],
})
export class SuggestionsModule { }
