import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional, IsString, Length } from 'class-validator';

export class CreateEvaluationDto {
    @ApiProperty({ minLength: 6, maxLength: 6 })
    @IsString()
    @Length(6, 6)
    errorCode: string;

    @ApiProperty({ minLength: 6, maxLength: 6 })
    @IsString()
    @Length(6, 6)
    clientCode: string;

    @ApiProperty()
    @IsBoolean()
    evaluation: boolean;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    comment?: string;
}
