import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateCarDto {
    @IsNotEmpty()
    @IsString()
    brand: string;

    @IsNotEmpty()
    @IsString()
    model: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    hp: number;

    @IsNotEmpty()
    @IsString()
    color: string;
}

