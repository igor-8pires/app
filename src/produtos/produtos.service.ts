import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProdutosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProdutoDto: CreateProdutoDto) {
    const produto = await this.prisma.produto.findUnique({
      where: {sku: createProdutoDto.sku},
    });

    if (produto) {
      throw new Error('Produto já cadastrado');
    }

    return await this.prisma.produto.create({
      data: createProdutoDto,
    });
  }

  async findAll() {
    const produtos = await this.prisma.produto.findMany();
    return produtos;
  }

  async findOne(id: number) {
   const produto = await this.prisma.produto.findUnique({
      where: { id },
    });

    if (!produto) {
      throw new Error('Produto não encontrado');
    }
    return produto;
  }


  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    const produto = await this.prisma.produto.findUnique({
      where: { id },
    });

    if (!produto) {
      throw new Error('Produto não encontrado');
    }

    return await this.prisma.produto.update({
      where: { id },
      data: updateProdutoDto,
    });
  }

  async remove(id: number) {
    const produto = await this.prisma.produto.findUnique({
      where: { id },
    });

    if (!produto) {
      throw new Error('Produto não encontrado');
    }

    return await this.prisma.produto.delete({
      where: { id },
    });
  }
}

