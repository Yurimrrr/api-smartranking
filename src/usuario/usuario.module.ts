import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from './interfaces/usuario.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature(
    [
      {name: 'Usuario', schema: UsuarioSchema}
    ]
    ),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
    })
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService]
})
export class UsuarioModule {}
