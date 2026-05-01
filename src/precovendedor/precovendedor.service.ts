import { Injectable } from '@nestjs/common';
import { CreatePrecovendedorDto } from './dto/create-precovendedor.dto';
import { UpdatePrecovendedorDto } from './dto/update-precovendedor.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrecovendedorService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPrecovendedorDto: CreatePrecovendedorDto) {
    return 'This action adds a new precovendedor';
  }

  findAll() {
    return `This action returns all precovendedor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} precovendedor`;
  }

  update(id: number, updatePrecovendedorDto: UpdatePrecovendedorDto) {
    return `This action updates a #${id} precovendedor`;
  }

  remove(id: number) {
    return `This action removes a #${id} precovendedor`;
  }
}
