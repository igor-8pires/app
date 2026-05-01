import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrecovendedorService } from './precovendedor.service';
import { CreatePrecovendedorDto } from './dto/create-precovendedor.dto';
import { UpdatePrecovendedorDto } from './dto/update-precovendedor.dto';

@Controller('precovendedor')
export class PrecovendedorController {
  constructor(private readonly precovendedorService: PrecovendedorService) {}

  @Post()
  create(@Body() createPrecovendedorDto: CreatePrecovendedorDto) {
    return this.precovendedorService.create(createPrecovendedorDto);
  }

  @Get()
  findAll() {
    return this.precovendedorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.precovendedorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrecovendedorDto: UpdatePrecovendedorDto) {
    return this.precovendedorService.update(+id, updatePrecovendedorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.precovendedorService.remove(+id);
  }
}
