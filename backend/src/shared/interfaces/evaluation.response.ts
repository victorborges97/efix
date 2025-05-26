import { ApiProperty } from "@nestjs/swagger";

export class EvaluationResponse {
    @ApiProperty()
    id: string;
    @ApiProperty()
    errorCode: string;
    @ApiProperty()
    evaluation: boolean;
    @ApiProperty()
    suggestionId: string;
    @ApiProperty({ type: Date })
    date: Date;
    @ApiProperty()
    clientCode: string;
    @ApiProperty({ type: 'string', required: false, nullable: true })
    comment: string | null;
}

export class EvaluationTotalResponse {
    @ApiProperty()
    total: number;
    @ApiProperty()
    average: number;
}