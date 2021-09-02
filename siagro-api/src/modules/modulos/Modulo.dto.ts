import { IsNotEmpty, MinLength } from 'class-validator';

export class ModuloDto {
    @IsNotEmpty()
    @MinLength(4)
    readonly nome: string;

  
}