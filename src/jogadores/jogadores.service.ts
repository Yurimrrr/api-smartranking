import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './Interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Injectable()
export class JogadoresService {

  constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}

  private readonly logger = new Logger(JogadoresService.name);

  private async foundJogadorById(_id: string): Promise<Jogador>{
    const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `Jogador com o id ${_id} não encontrado`,
      );
    }
    return jogadorEncontrado;
  }

  async insertJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criarJogadorDto;
    const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

    if (jogadorEncontrado) {
      throw new BadRequestException(`Jogador com o e-mail ${email} já cadastrado`);
    }

    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
    return await jogadorCriado.save();
  }

  async updateJogador(_id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise<void> {

    const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com o id ${_id} não encontrado`);
    }

    await this.jogadorModel.findOneAndUpdate({_id}, {$set: atualizarJogadorDto}).exec()

  }

  async getAllJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async getJogadorById(_id: string): Promise<Jogador> {
    const jogadorEncontrado = this.foundJogadorById(_id);
    return jogadorEncontrado;
  }

  async deleteJogador(_id: string): Promise<any> {
    this.foundJogadorById(_id);
    return await this.jogadorModel.deleteOne({_id}).exec()
  }


}
