import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUsuarioDto {
  @ApiProperty({
    description: "Campo que exibe o telefone ou celular do usuario.",
    example: "31997219811"
  })
  @IsNotEmpty()
  readonly telefoneCelular: string;
  @ApiProperty({
    description: "Campo que exibe o email do usuario.",
    example: "teste@abc.com"
  })
  @IsEmail()
  readonly email: string;
  @ApiProperty({
    description: "Campo que exibe o nome do usuario.",
    example: "yuri"
  })
  @IsNotEmpty()
  readonly nome: string;

  @ApiProperty({
    description: "Senha do usuario.",
    example: "teste123!"
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  senha: string;
}
