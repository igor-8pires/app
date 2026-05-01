import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItempedidoService } from './itempedido.service';
import { CreateItempedidoDto } from './dto/create-itempedido.dto';
import { UpdateItempedidoDto } from './dto/update-itempedido.dto';

@Controller('itempedido')
export class ItempedidoController {
  constructor(private readonly itempedidoService: ItempedidoService) {}

  @Post()
  create(@Body() createItempedidoDto: CreateItempedidoDto) {
    return this.itempedidoService.create(createItempedidoDto);
  }

  @Get()
  findAll() {
    return this.itempedidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itempedidoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItempedidoDto: UpdateItempedidoDto) {
    return this.itempedidoService.update(+id, updateItempedidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itempedidoService.remove(+id);
  }
}
