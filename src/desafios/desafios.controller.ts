import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { CreateDesafioDto } from './dto/create-desafio.dto';
import { UpdateDesafioDto } from './dto/update-desafio.dto';

@Controller('api/v1/desafios')
export class DesafiosController {
  constructor(private readonly desafiosService: DesafiosService) {}

  @Post()
  create(@Body() createDesafioDto: CreateDesafioDto) {
    return this.desafiosService.create(createDesafioDto);
  }

  @Get()
  findAll() {
    return this.desafiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.desafiosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDesafioDto: UpdateDesafioDto) {
    return this.desafiosService.update(+id, updateDesafioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.desafiosService.remove(+id);
  }
}
