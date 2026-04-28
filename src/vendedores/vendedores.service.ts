import { Injectable } from '@nestjs/common';
import { CreateVendedoreDto } from './dto/create-vendedore.dto';
import { UpdateVendedoreDto } from './dto/update-vendedore.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VendedoresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVendedoreDto: CreateVendedoreDto) {
   const vendedor = await this.prisma.vendedor.findUnique({
      where: { email: createVendedoreDto.email },
    });

    if (vendedor) {
      throw new Error('Vendedor já cadastrado');
    }

    return await this.prisma.vendedor.create({
      data: createVendedoreDto,
    });
  }

  async findAll() {
    const vendedores = await this.prisma.vendedor.findMany();
    return vendedores;
  }

  async findOne(id: number) {
    const vendedor = await this.prisma.vendedor.findUnique({
      where: { id },
    });

    if (!vendedor) {
      throw new Error('Vendedor não encontrado');
    }

    return vendedor;
  }

  async update(id: number, updateVendedoreDto: UpdateVendedoreDto) {
    const vendedor = await this.prisma.vendedor.findUnique({
      where: { id },
    });

    if (!vendedor) {
      throw new Error('Vendedor não encontrado');
    }

    return await this.prisma.vendedor.update({
      where: { id },
      data: updateVendedoreDto,
    });
  }

  async remove(id: number) {
    const vendedor = await this.prisma.vendedor.findUnique({
      where: { id },
    });

    if (!vendedor) {
      throw new Error('Vendedor não encontrado');
    }

    return await this.prisma.vendedor.delete({
      where: { id },
    });
  }
}
