import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from './interfaces/usuario.schema';

@Module({
  imports: [MongooseModule.forFeature(
    [
      {name: 'Usuario', schema: UsuarioSchema}
    ]
    )
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService]
})
export class UsuarioModule {}
