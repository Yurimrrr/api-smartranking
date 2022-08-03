import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Jogador } from 'src/jogadores/Interfaces/jogador.interface';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Injectable()
export class CategoriasService {

  constructor(@InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
              private readonly jogadoresService: JogadoresService){}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const {categoria} = createCategoriaDto;

    const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();

    if(categoriaEncontrada){
      throw new BadRequestException(`Categoria ${categoria} já cadastrada`);
      
    }

    const categoriaCriada = new this.categoriaModel(createCategoriaDto);
    return await categoriaCriada.save();
  }

  async findAll(): Promise<Categoria[]>{
    return await this.categoriaModel.find().populate("jogadores").exec();
  }

  async findOne(categoria: string): Promise<Categoria> {
    const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();

    if(!categoriaEncontrada){
      throw new NotFoundException(
        `Categoria ${categoria} não encontrado`,
      );
    }

    return categoriaEncontrada;
  }

  async findByJogador(idJogador: Jogador): Promise<Categoria> {
    const categoriaEncontrada = await this.categoriaModel.findOne({jogadores: idJogador}).exec();

    if(!categoriaEncontrada){
      throw new NotFoundException(
        `Jogador ${idJogador} não vinculado à uma categoria`,
      );
    }

    return categoriaEncontrada;
  }

  async update(_id: string, updateCategoriaDto: UpdateCategoriaDto): Promise<void> {
    const categoriaEncontrado = await this.categoriaModel.findOne({_id}).exec();

    if (!categoriaEncontrado) {
      throw new NotFoundException(`Categoria com o id ${_id} não encontrado`);
    }

    await this.categoriaModel.findOneAndUpdate({_id}, {$set: updateCategoriaDto}).exec()
  }

  async remove(_id: string): Promise<any> {
    const categoriaEncontrado = await this.categoriaModel.findOne({_id}).exec();

    if (!categoriaEncontrado) {
      throw new NotFoundException(`Categoria com o id ${_id} não encontrado`);
    }
    return await this.categoriaModel.deleteOne({_id}).exec()
  }

  async linkJogadorToCategoria(params: string[]): Promise<void>{

    const categoria = params['categoria'];
    const idJogador = params['idJogador'];

    const categoriaEncontrado = await this.categoriaModel.findOne({categoria}).exec();

    const jogadorCadastradoCategoria = await this.categoriaModel.find({categoria}).where('jogadores').in(idJogador);

    const jogador = await this.jogadoresService.getJogadorById(idJogador);

    if (!categoriaEncontrado) {
      throw new NotFoundException(`Categoria ${categoria} não encontrado`);
    }

    if(jogadorCadastradoCategoria.length > 0){
      throw new BadRequestException(`Jogador ${jogador.nome} já cadastrado na Categoria ${categoria}`)
    }

    categoriaEncontrado.jogadores.push(idJogador);

    await this.categoriaModel.findOneAndUpdate({categoria},{$set: categoriaEncontrado}).exec();


  }
}
