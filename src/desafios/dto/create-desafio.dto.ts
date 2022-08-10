import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsNotEmpty } from "class-validator";
import { Jogador } from "src/jogadores/Interfaces/jogador.interface";

export class CreateDesafioDto {
    @ApiProperty({
        description: "Campo que exibe a data e hora do desafio.",
        example: "2012-04-23T18:25:43.511Z"
    })
    @IsNotEmpty()
    @IsDateString()
    dataHoraDesafio: Date;

    @ApiProperty({
        description: "Jogador solicitante do desafio.",
        example: "2012-04-23T18:25:43.511Z"
    })
    @IsNotEmpty()
    solicitante: Jogador;

    @ApiProperty({
        description: "Jogadores do desafio.",
        example: "2012-04-23T18:25:43.511Z"
    })
    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    jogadores: Array<Jogador>;
}
