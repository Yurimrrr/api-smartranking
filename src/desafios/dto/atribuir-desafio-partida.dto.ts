import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { Jogador } from 'src/jogadores/Interfaces/jogador.interface';
import { JogadorSchema } from 'src/jogadores/Interfaces/jogador.schema';
import { Resultado } from '../interfaces/desafio.interface';
import { ApiProperty } from '@nestjs/swagger';

export class AtribuirDesafioPartidaDto{

  @ApiProperty({
    description: "Campo que exibe o jogador vencedor do desafio. ID",
    example: '62e9b580811538cb151b577b',
  })
  @IsNotEmpty()
  def: Jogador;

  //rever
  @ApiProperty({
    description: "Resultado do desafio.",
    example: '62e9b580811538cb151b577b',
  })
  @IsNotEmpty()
  resultado: Array<Resultado>;
  
}
