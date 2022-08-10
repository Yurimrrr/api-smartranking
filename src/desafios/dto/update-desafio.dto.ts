import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { DesafioStatus } from '../interfaces/desafio.interface';
import { CreateDesafioDto } from './create-desafio.dto';

export class UpdateDesafioDto extends PartialType(CreateDesafioDto) {
  @ApiProperty({
    description: "Campo que exibe a data e hora do desafio.",
    example: "2012-04-23T18:25:43.511Z"
  })
  @IsNotEmpty()
  @IsDateString()
  dataHoraDesafio: Date;

  @ApiProperty({
    description: "Campo que exibe o status em que o desafio está.",
    example: DesafioStatus.PENDENTE,
    enum: DesafioStatus
  })
  @IsNotEmpty()
  status: string;
  
}
