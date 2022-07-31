import * as mongoose from 'mongoose';
import { timestamp } from 'rxjs';

export const JogadorSchema = new mongoose.Schema(
  {
    telefoneCelular: { type: String, unique: true },
    email: { type: String },
    nome: String,
    ranking: String,
    posicaoRanking: Number,
    urlFotoJogador: String,
  },
  { timestamps: true, collection: 'jogadores' },
);
