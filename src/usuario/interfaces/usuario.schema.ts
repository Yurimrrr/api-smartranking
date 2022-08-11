import * as mongoose from 'mongoose';
import { timestamp } from 'rxjs';

export const UsuarioSchema = new mongoose.Schema(
  {
    telefoneCelular: { type: String, unique: true },
    email: { type: String },
    nome: String,
    senha: String,
    jogador: {type: mongoose.Schema.Types.ObjectId, ref: "Jogador"},
    urlFotoUsuario: String,
  },
  { timestamps: true, collection: 'usuarios' },
);

