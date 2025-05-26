import { Module } from '@nestjs/common';
import { SuggestionsModule } from './suggestions/suggestions.module';
import { EvaluationsModule } from './evaluations/evaluations.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    SuggestionsModule,
    EvaluationsModule,
    DashboardModule,
  ],
})
export class AppModule { }
