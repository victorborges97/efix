import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateSuggestionDto {
  @ApiProperty({ minLength: 6, maxLength: 6 })
  @IsString()
  @Length(6, 6)
  errorCode: string;

  @ApiProperty()
  @IsString()
  text: string;
}
