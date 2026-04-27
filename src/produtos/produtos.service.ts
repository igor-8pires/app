import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProdutosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProdutoDto: CreateProdutoDto) {
    const produto = await this.prisma.produto.create({
      data: createProdutoDto,
    });
    return produto;
  }

  async findAll() {
    return await this.prisma.produto.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.produto.findUnique({
      where: { id },
    });
  }


  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return await this.prisma.produto.update ({
      where: { id },
      data: updateProdutoDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.produto.delete({
      where: { id },
    });
  }
}

