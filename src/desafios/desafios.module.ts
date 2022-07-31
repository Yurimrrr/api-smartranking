import { Module } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { DesafiosController } from './desafios.controller';
import { DesafioSchema } from './interfaces/desafio.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { CategoriasModule } from 'src/categorias/categorias.module';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Categoria', schema: DesafioSchema}]),
            JogadoresModule, CategoriasModule],
  controllers: [DesafiosController],
  providers: [DesafiosService]
})
export class DesafiosModule {}
