import { Date, Document } from "mongoose";
import { Jogador } from "src/jogadores/Interfaces/jogador.interface";

export interface Desafio extends Document{
    readonly dataHoraDesafio: Date;
    status: string;
    dataHoraSolicitacao: Date;
    solicitante: string;
    categoria: string;
    jogadores: Array<Jogador>
    partida: Partida
}


export interface Partida extends Document{
    categoria: string;
    jogadores: Array<Jogador>;
    def: Jogador;
    resultado: Array<Resultado>;
}

export interface Resultado {
    set: string;
}
// "dataHoraDesafio": "2020-05-04 18:00:00",
// 	"status": "REALIZADO",
// 	"dataHoraSolicitacao": "2020-04-25 08:30:00",
// 	"dataHoraResposta": "2020-04-26 08:30:00",
// 	"solicitante": "534e5168-8baf-11ea-bc55-0242ac130003",
// 	"categoria": "A",
// 	"jogadores": [{
// 			"_id": "534e5168-8baf-11ea-bc55-0242ac130003"
// 		},
// 		{
// 			"_id": "f27263d6-8bb6-11ea-bc55-0242ac130003"
// 		}