import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class UpdateCarDto {
    @IsString()
    brand?: string;

    @IsString()
    model?: string;

    @IsNumber()
    @Min(0)
    hp?: number;

    @IsString()
    color?: string;
}
