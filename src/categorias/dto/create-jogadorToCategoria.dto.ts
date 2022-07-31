import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";
import { Evento } from "../interfaces/categoria.interface";

export class CreateJogadorToCategoria {
  @IsString()
  @IsNotEmpty()
  readonly jogador_id: string;
}
