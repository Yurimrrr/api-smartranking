import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriasService } from 'src/categorias/categorias.service';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { CreateDesafioDto } from './dto/create-desafio.dto';
import { UpdateDesafioDto } from './dto/update-desafio.dto';
import { Desafio } from './interfaces/desafio.interface';

@Injectable()
export class DesafiosService {

   constructor(@InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
              private readonly jogadoresService: JogadoresService,
              private readonly categoriasService: CategoriasService){}

  async create(createDesafioDto: CreateDesafioDto): Promise<Desafio> {

    let {solicitante} = createDesafioDto;

    const {jogadores} = createDesafioDto;

    let solicitanteInJogadores = false;

    jogadores.forEach(async jogador => {
      let jogadorEncontrado = await this.jogadoresService.getJogadorById(jogador._id);
      if(solicitante._id == jogador._id){
        solicitanteInJogadores = true;
        solicitante = jogadorEncontrado;
      }
    });

    // Não to sabendo verificar isso ainda.
    // await this.categoriasService.findOne(solicitante)

    if(!solicitanteInJogadores){
      throw new BadRequestException(`O solicitante ${solicitante} não está vinculado ào desafio`);
    }
    
    const desafio = new this.desafioModel(createDesafioDto);

    return await desafio.save();
  }

  findAll() {
    return `This action returns all desafios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} desafio`;
  }

  update(id: number, updateDesafioDto: UpdateDesafioDto) {
    return `This action updates a #${id} desafio`;
  }

  remove(id: number) {
    return `This action removes a #${id} desafio`;
  }
}
