import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Pedido, Prisma } from '../generated/prisma/client';


@Injectable()
export class PedidosService {
  constructor(private readonly prisma: PrismaService) {} 

  async create(createPedidoDto: CreatePedidoDto) {
    const pedido = await this.prisma.pedido.findFirst({
      where: { 
        clienteId: createPedidoDto.clienteId, 
        dataPedido: createPedidoDto.dataPedido, 
        vendedorId: createPedidoDto.vendedorId,
        valorTotal: createPedidoDto.valorTotal,
        status: createPedidoDto.status 

      },
    });

    if (pedido) {
      throw new Error('Pedido já cadastrado');
    }

    return await this.prisma.pedido.create({
      data: createPedidoDto,
    });
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
    const pedido = await this.prisma.pedido.findUnique({
      where: { id },
    });

    if (!pedido) {
      throw new Error('Pedido não encontrado');
    }

    return await this.prisma.pedido.delete({
      where: { id },
    });
    return pedido;
  }

}
