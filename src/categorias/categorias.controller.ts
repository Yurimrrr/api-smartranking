import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { CreateJogadorToCategoria } from './dto/create-jogadorToCategoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao_parametros.pipe';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('categorias')
@Controller('api/v1/categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @UsePipes(ValidationPipe) 
  async create(@Body() createCategoriaDto: CreateCategoriaDto):  Promise<Categoria>{
    return this.categoriasService.create(createCategoriaDto);
  }

  @Post(':categoria/jogador/:idJogador')
  @UsePipes(ValidationPipe)
  async linkJogadorToCategoria(
    @Param() params: string[]): Promise<void>{
    return this.categoriasService.linkJogadorToCategoria(params);
  }

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get('/:categoria')
  findOne(@Param('categoria', ValidacaoParametrosPipe) categoria: string) {
    return this.categoriasService.findOne(categoria);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  update(@Param('id', ValidacaoParametrosPipe) id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(id);
  }
}
