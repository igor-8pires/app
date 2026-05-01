import { Injectable } from '@nestjs/common';
import { CreateMovimentacaoestoqueDto } from './dto/create-movimentacaoestoque.dto';
import { UpdateMovimentacaoestoqueDto } from './dto/update-movimentacaoestoque.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MovimentacaoestoqueService {
  constructor(private readonly prisma: PrismaService) {}
  create(createMovimentacaoestoqueDto: CreateMovimentacaoestoqueDto) {
    return 'This action adds a new movimentacaoestoque';
  }

  findAll() {
    return `This action returns all movimentacaoestoque`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movimentacaoestoque`;
  }

  update(id: number, updateMovimentacaoestoqueDto: UpdateMovimentacaoestoqueDto) {
    return `This action updates a #${id} movimentacaoestoque`;
  }

  remove(id: number) {
    return `This action removes a #${id} movimentacaoestoque`;
  }
}
