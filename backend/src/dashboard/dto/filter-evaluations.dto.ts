import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";

export class FilterEvaluationsDto {
    @ApiProperty({ required: false })
    @IsOptional()
    from?: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    to?: Date;

    @ApiProperty({ required: false, minLength: 6, maxLength: 6 })
    @IsOptional()
    @IsString()
    @Length(6, 6)
    errorCode?: string;
}

export class FilterEvaluationTotalDto {
    @ApiProperty({ required: false })
    @IsOptional()
    from?: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    to?: Date;
}