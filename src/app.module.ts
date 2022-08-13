import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosModule } from './desafios/desafios.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:fn3SrClzW7X5Sq1z@cluster0.zh9zwe3.mongodb.net/smartranking?retryWrites=true&w=majority',
    ),
    JogadoresModule,
    CategoriasModule,
    DesafiosModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
