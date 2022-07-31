import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { Jogador } from './Interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao_parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) { }

  @Post()
  @UsePipes(ValidationPipe)
  async insertJogador(@Body() criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return await this.jogadoresService.insertJogador(criaJogadorDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updateJogador(
      @Param('_id', ValidacaoParametrosPipe) _id: string,
      @Body() atualizarJogadorDto: AtualizarJogadorDto
      ): Promise<void> {
    await this.jogadoresService.updateJogador(_id, atualizarJogadorDto);
  }

  @Get()
  async getJogadores(): Promise<Jogador[]> {
    return this.jogadoresService.getAllJogadores();
  }

  @Get('/:_id')
  async getJogadorById(
    @Param('_id', ValidacaoParametrosPipe) _id: string,
  ): Promise<Jogador> {
    return this.jogadoresService.getJogadorById(_id);
  }

  @Delete('/:_id')
  async deleteJogador(@Param('_id', ValidacaoParametrosPipe) _id: string): Promise<void> {
    this.jogadoresService.deleteJogador(_id);
  }
}
