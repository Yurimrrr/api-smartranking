import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UnauthorizedException, Request, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { Response, Request as RequestEx } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('usuarios')
@Controller('api/v1/usuarios')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly authService: AuthService
    ) {}

  @Post('registrar')
  async register(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  //Antigo
  // @Post('login')
  // async login(
  //   @Body() loginUsuarioDto: LoginUsuarioDto,
  //   @Res({passthrough: true}) response: Response
  //   ): Promise<any> {
  //   const jwt = await this.usuarioService.login(loginUsuarioDto);

  //   response.cookie('jwt', jwt, {httpOnly: true});

  //   return {
  //     message: 'Success'
  //   };
  // }

  // @Get('user')
  // async user(@Req() req: RequestEx){
  //   try {
  //     const cookie = req.cookies['jwt'];

  //     const data = await this.usuarioService.verifyJwt(cookie);

  //     if(!data){
  //       return new UnauthorizedException();
  //     }

  //     const user = await this.usuarioService.findOne({id: data['id']})

  //     const {senha, ...resultado} = user;

  //     return resultado;
  //   } catch (e) {
  //     return new UnauthorizedException();
  //   }
    
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
