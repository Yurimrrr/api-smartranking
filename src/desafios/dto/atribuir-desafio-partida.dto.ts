import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { Jogador } from 'src/jogadores/Interfaces/jogador.interface';
import { Resultado } from '../interfaces/desafio.interface';


export class AtribuirDesafioPartidaDto{
  @IsNotEmpty()
  def: Jogador;

  @IsNotEmpty()
  resultado: Array<Resultado>;
  
}
