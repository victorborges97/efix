import { ApiProperty } from "@nestjs/swagger";

export class SuggestionResponse {
    @ApiProperty()
    id: string;
    @ApiProperty()
    errorCode: string;
    @ApiProperty()
    text: string;
}

export class SuggestionResponseAverage {
    @ApiProperty({ type: SuggestionResponse })
    suggestion: SuggestionResponse;
    @ApiProperty()
    averageEvaluation: number;
    @ApiProperty()
    totalEvaluations: number;
    @ApiProperty()
    positiveEvaluations: number;
}