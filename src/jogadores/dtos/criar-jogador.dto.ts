import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator'

export class CriarJogadorDto {
  @ApiProperty({
    description: "Campo que exibe o telefone ou celular do jogador.",
    example: "31997219811"
  })
  @IsNotEmpty()
  readonly telefoneCelular: string;
  @ApiProperty({
    description: "Campo que exibe o email do jogador.",
    example: "teste@abc.com"
  })
  @IsEmail()
  readonly email: string;
  @ApiProperty({
    description: "Campo que exibe o nome do jogador.",
    example: "yuri"
  })
  @IsNotEmpty()
  readonly nome: string;
}
