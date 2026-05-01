import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovimentacaoestoqueService } from './movimentacaoestoque.service';
import { CreateMovimentacaoestoqueDto } from './dto/create-movimentacaoestoque.dto';
import { UpdateMovimentacaoestoqueDto } from './dto/update-movimentacaoestoque.dto';

@Controller('movimentacaoestoque')
export class MovimentacaoestoqueController {
  constructor(private readonly movimentacaoestoqueService: MovimentacaoestoqueService) {}

  @Post()
  create(@Body() createMovimentacaoestoqueDto: CreateMovimentacaoestoqueDto) {
    return this.movimentacaoestoqueService.create(createMovimentacaoestoqueDto);
  }

  @Get()
  findAll() {
    return this.movimentacaoestoqueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimentacaoestoqueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovimentacaoestoqueDto: UpdateMovimentacaoestoqueDto) {
    return this.movimentacaoestoqueService.update(+id, updateMovimentacaoestoqueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimentacaoestoqueService.remove(+id);
  }
}
