import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class LoginUsuarioDto {
  
  @ApiProperty({
    description: "Campo que envia o email p login do usuario.",
    example: "teste@abc.com"
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: "Campo que envia a senha p login do usuario.",
    example: "teste123!"
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  senha: string;
}
