import { IsNotEmpty, MinLength } from 'class-validator';

export class PropriedadeDto {
    @IsNotEmpty()
    @MinLength(4)
    readonly nome: string;

    @IsNotEmpty()
    readonly proprietario: string;
    
    @IsNotEmpty()
    readonly contato: string;

    @IsNotEmpty()
    readonly telefone: string;


}