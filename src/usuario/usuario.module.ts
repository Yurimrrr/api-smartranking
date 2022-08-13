import { forwardRef, Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from './interfaces/usuario.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature(
    [
      {name: 'Usuario', schema: UsuarioSchema}
    ]
    ),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
    }), 
    forwardRef(() => AuthModule)
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService]
})
export class UsuarioModule {}
