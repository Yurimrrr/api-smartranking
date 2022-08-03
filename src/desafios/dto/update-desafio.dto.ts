import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { CreateDesafioDto } from './create-desafio.dto';

export class UpdateDesafioDto extends PartialType(CreateDesafioDto) {
  @IsNotEmpty()
  @IsDateString()
  dataHoraDesafio: Date;

  @IsNotEmpty()
  status: string;
  
}
