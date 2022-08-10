import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao_parametros.pipe';
import { DesafiosService } from './desafios.service';
import { AtribuirDesafioPartidaDto } from './dto/atribuir-desafio-partida.dto';
import { CreateDesafioDto } from './dto/create-desafio.dto';
import { UpdateDesafioDto } from './dto/update-desafio.dto';
import { DesafioStatusValidacaoPipe } from './pipes/desafio-status-validation.pipe';
@ApiTags('desafios')
@Controller('api/v1/desafios')
export class DesafiosController {
  constructor(private readonly desafiosService: DesafiosService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createDesafioDto: CreateDesafioDto) {
    return this.desafiosService.create(createDesafioDto);
  }

  @Post('/partida/:idDesafio')
  @UsePipes(ValidationPipe)
  atribuirDesafioPartida(@Param('idDesafio', ValidacaoParametrosPipe) idDesafio: string, @Body() atribuirDesafioPartida: AtribuirDesafioPartidaDto) {
    return this.desafiosService.atribuirDesafioPartida(idDesafio ,atribuirDesafioPartida);
  }

  @Get()
  findAll() {
    return this.desafiosService.findAll();
  }

  @Get('/jogador/:id')
  findOne(@Param('id', ValidacaoParametrosPipe) id: string) {
    return this.desafiosService.findByJogador(id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id', ValidacaoParametrosPipe) id: string, @Body(DesafioStatusValidacaoPipe) updateDesafioDto: UpdateDesafioDto) {
    return this.desafiosService.update(id, updateDesafioDto);
  }

  @Delete(':id')
  remove(@Param('id', ValidacaoParametrosPipe) id: string) {
    return this.desafiosService.remove(id);
  }
}
