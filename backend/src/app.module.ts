import { Module } from '@nestjs/common';
import { SuggestionsModule } from './suggestions/suggestions.module';
import { EvaluationsModule } from './evaluations/evaluations.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { EventsModule } from './events/events.module';
import { EventsGateway } from './events/events.gateway';

@Module({
  imports: [
    SuggestionsModule,
    EvaluationsModule,
    DashboardModule,
    EventsModule,
  ],
})
export class AppModule { }
