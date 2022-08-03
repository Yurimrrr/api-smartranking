import { BadRequestException, PipeTransform } from "@nestjs/common";
import { DesafioStatus } from "../interfaces/desafio.interface";

export class DesafioStatusValidacaoPipe implements PipeTransform{
  readonly statusPermitidos = [
    DesafioStatus.ACEITO,
    DesafioStatus.NEGADO,
    DesafioStatus.CANCELADO
  ];

  transform(value: any){
    const status = value.status.toUpperCase();

    if(!this.statusValido(status)){
      throw new BadRequestException(`${status} é um status invalido`);   
    }

    return value;
  }

  private statusValido(status: any){
    const idx = this.statusPermitidos.indexOf(status);

    return idx !== -1;
  }
}