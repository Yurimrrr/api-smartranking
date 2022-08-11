import { Document } from "mongoose";
import { Jogador } from "src/jogadores/Interfaces/jogador.interface";

export interface Usuario extends Document {
  readonly telefoneCelular: string;
  readonly email: string;
  nome: string;
  senha: string;
  jogador: Jogador;
  urlFotoUsuario: string;
}
