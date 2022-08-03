import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriasService } from 'src/categorias/categorias.service';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { AtribuirDesafioPartidaDto } from './dto/atribuir-desafio-partida.dto';
import { CreateDesafioDto } from './dto/create-desafio.dto';
import { UpdateDesafioDto } from './dto/update-desafio.dto';
import { Desafio, DesafioStatus, Partida } from './interfaces/desafio.interface';
import { Date } from "mongoose";

@Injectable()
export class DesafiosService {

   constructor(@InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
              @InjectModel('Partida') private readonly partidaModel: Model<Partida>,
              private readonly jogadoresService: JogadoresService,
              private readonly categoriasService: CategoriasService
              ){}

  async create(createDesafioDto: CreateDesafioDto): Promise<Desafio> {

    let {solicitante} = createDesafioDto;

    const {jogadores} = createDesafioDto;

    let solicitanteInJogadores = false;

    jogadores.forEach(async jogador => {
      await this.jogadoresService.getJogadorById(jogador._id);
    });

    jogadores.forEach(jogador => {
      if(solicitante == jogador._id){
        solicitanteInJogadores = true;
      }
    });

    const categoriaDoJogador = await this.categoriasService.findByJogador(solicitante);

    if(!solicitanteInJogadores){
      throw new BadRequestException(`O solicitante ${solicitante} não está vinculado ào desafio`);
    }
    
    var desafio = new this.desafioModel(createDesafioDto);
    desafio.categoria = categoriaDoJogador.categoria;
    desafio.status = DesafioStatus.PENDENTE;
    desafio.dataHoraSolicitacao = new Date();

    return await desafio.save();
  }

  async findAll(): Promise<Desafio[]> {
    return await this.desafioModel.find().populate("jogadores").populate("solicitante").populate("partida").exec();
  }

  async findByJogador(id: string): Promise<Desafio[]> {
    await this.jogadoresService.getJogadorById(id);

    return await this.desafioModel.find({jogadores: id}).populate("jogadores").populate("solicitante").populate("partida").exec();

    // outra opcao de pesquisa
    // return await this.desafioModel.find().where('jogadores').in(id).exec();
  }

  async update(id: string, updateDesafioDto: UpdateDesafioDto): Promise<void> {
    const desafioEncontrado = await this.findDesafioById(id);

    if(updateDesafioDto.status){
      desafioEncontrado.dataHoraResposta = new Date();
    }

    desafioEncontrado.status = updateDesafioDto.status;
    desafioEncontrado.dataHoraDesafio = updateDesafioDto.dataHoraDesafio;

    await this.desafioModel.findOneAndUpdate({id}, {$set: desafioEncontrado})
    
  }

  async remove(id: string): Promise<void> {
    this.findDesafioById(id);

    var desafio = { 
      status: DesafioStatus.CANCELADO
    }

    await this.desafioModel.findOneAndUpdate({id}, {$set: desafio})
  }

  async atribuirDesafioPartida(id: string, atribuirDesafioPartida: AtribuirDesafioPartidaDto){
    const desafioEncontrado = await this.findDesafioById(id);
    const {def} = atribuirDesafioPartida;

    const jogadorFilter = desafioEncontrado.jogadores.filter(jogador => jogador._id == atribuirDesafioPartida.def)

    if(!jogadorFilter){
      throw new BadRequestException(`Jogador com o id ${def._id} não faz parte do desafio`);
    }

    const partidaCriada = new this.partidaModel(atribuirDesafioPartida);

    partidaCriada.categoria = desafioEncontrado.categoria;

    
    partidaCriada.jogadores = desafioEncontrado.jogadores;

    const resultado = await partidaCriada.save();

    desafioEncontrado.status = DesafioStatus.REALIZADO;

    desafioEncontrado.partida = resultado._id;

    try{
      await this.desafioModel.findOneAndUpdate({id}, {$set: desafioEncontrado}).exec();
    }catch(error){
      await this.partidaModel.deleteOne({_id: resultado._id}).exec();
      throw new InternalServerErrorException();
    }
  }

  async findDesafioById(id: string): Promise<Desafio>{
    const desafioEncontrado = await this.desafioModel.findOne({id}).exec();

    if(!desafioEncontrado){
      throw new BadRequestException(`Desafio com o id ${id} não existe`);
    }

    return desafioEncontrado;
  }

}
