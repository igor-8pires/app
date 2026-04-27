import { Injectable } from '@nestjs/common';
import { CreateVendedoreDto } from './dto/create-vendedore.dto';
import { UpdateVendedoreDto } from './dto/update-vendedore.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VendedoresService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createVendedoreDto: CreateVendedoreDto) {
    return await this.prisma.vendedor.create({
      data: createVendedoreDto,
    });
  }

  async findAll() {
    return await this.prisma.vendedor.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.vendedor.findUnique({
      where: { id },
    }); 
  }

  async update(id: number, updateVendedoreDto: UpdateVendedoreDto) {
    return await this.prisma.vendedor.update({
      where: { id },
      data: updateVendedoreDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.vendedor.delete({
      where: { id },
    });
  }
}
