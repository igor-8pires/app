import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Pedido, Prisma } from '../generated/prisma/client';


@Injectable()
export class PedidosService {
  constructor(private readonly prisma: PrismaService) {} 
  async create(createPedidoDto: CreatePedidoDto) {
    const pedido = await this.prisma.pedido.create({
      data: {
        dataPedido: createPedidoDto.dataPedido,
        status: createPedidoDto.status,
        valorTotal: createPedidoDto.valorTotal,
        vendedorId: createPedidoDto.vendedorId,
        clienteId: createPedidoDto.clienteId,
      },
    });
    return pedido;
  }

  async findAll() {
    return await this.prisma.pedido.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.pedido.findUnique({
      where: { id },
    });
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return await this.prisma.pedido.update({
      where: { id },
      data: {
        dataPedido: updatePedidoDto.dataPedido,
        status: updatePedidoDto.status,
        valorTotal: updatePedidoDto.valorTotal,
        vendedorId: updatePedidoDto.vendedorId,
        clienteId: updatePedidoDto.clienteId,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.pedido.delete({
      where: { id },
    });
  }
}
