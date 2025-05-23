import { Module } from '@nestjs/common';
import { SuggestionsModule } from './suggestions/suggestions.module';
import { EvaluationsModule } from './evaluations/evaluations.module';

@Module({
  imports: [
    SuggestionsModule,
    EvaluationsModule,
  ],
})
export class AppModule { }
