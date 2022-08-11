import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './interfaces/usuario.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {

  constructor(@InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>){}

  private readonly logger = new Logger(JogadoresService.name);


  async create(createUsuarioDto: CreateUsuarioDto) {
    const { email } = createUsuarioDto;
    const { senha } = createUsuarioDto;
    
    const hashPassword = await bcrypt.hash(senha, 12);

    createUsuarioDto.senha = hashPassword;

    const usuarioEncontrado = await this.usuarioModel.findOne({email}).exec();

    if (usuarioEncontrado) {
      throw new BadRequestException(`Usuario com o e-mail ${email} já cadastrado`);
    }

    const usuarioCriado = new this.usuarioModel(createUsuarioDto);
    return await usuarioCriado.save();
  }

  findAll() {
    return `This action returns all usuario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
