import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './interfaces/usuario.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>,
    private jwtService: JwtService
    ){}

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

  async login(loginUsuarioDto: LoginUsuarioDto){

    const { email } = loginUsuarioDto;
    const { senha } = loginUsuarioDto;

    const user = await this.usuarioModel.findOne({email: email});

    if(!user){
      return new BadRequestException(`Usuario com o email: ${email} não existe`);
    }
    if(!await bcrypt.compare(senha, user.senha)){
      return new BadRequestException(`Senha invalida`)
    }
    const jwt = await this.jwtService.signAsync({id: user.id})
    return jwt;
  }

  async verifyJwt(cookie: any){
    return this.jwtService.verifyAsync(cookie);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioModel.find().exec();
  }

  async findOne(condition: any): Promise<Usuario> {
    return await this.usuarioModel.findOne(condition);
  }

  async findOneByEmail(email: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({email: email});
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
