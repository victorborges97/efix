import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SuggestionsService } from './suggestions.service';
import { SuggestionsController } from './suggestions.controller';

@Module({
    controllers: [SuggestionsController],
    providers: [SuggestionsService, PrismaService],
})
export class SuggestionsModule { }
