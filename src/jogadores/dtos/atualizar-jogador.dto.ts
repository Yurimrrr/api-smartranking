import { ApiProperty } from '@nestjs/swagger';
import {  IsNotEmpty } from 'class-validator'

export class AtualizarJogadorDto {
  @ApiProperty({
    description: "Campo que exibe o telefone ou celular do jogador.",
    example: "31997219811"
  })
  @IsNotEmpty()
  readonly telefoneCelular: string;

  @ApiProperty({
    description: "Campo que exibe o nome do jogador.",
    example: "yuri"
  })
  @IsNotEmpty()
  readonly nome: string;
}
