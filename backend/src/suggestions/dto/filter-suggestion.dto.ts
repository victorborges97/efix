import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";

export class FilterSuggestionDto {
    @ApiProperty({ required: false, minLength: 6, maxLength: 6 })
    @IsOptional()
    @IsString()
    @Length(6, 6)
    errorCode?: string;
}