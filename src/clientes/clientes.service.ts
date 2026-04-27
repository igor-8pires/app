
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Cliente, Prisma } from '../generated/prisma/client';

@Injectable()
export class ClientesService {
  constructor(private readonly prisma: PrismaService) { }

  async cliente(
    clienteWhereUniqueInput: Prisma.ClienteWhereUniqueInput,
  ): Promise<Cliente | null> {
    return this.prisma.cliente.findUnique({
      where: clienteWhereUniqueInput,
    });
  }

  async clientes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ClienteWhereUniqueInput;
    where?: Prisma.ClienteWhereInput;
    orderBy?: Prisma.ClienteOrderByWithRelationInput;
  }): Promise<Cliente[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.cliente.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = await this.prisma.cliente.findUnique({
      where: {
        email: createClienteDto.email,
      },
    });

    if (cliente) {
      throw new HttpException('Email já cadastrado', HttpStatus.BAD_REQUEST);
    }

    const newcliente = await this.prisma.cliente.create({
      data: {
        email: createClienteDto.email,
        nome: createClienteDto.nome,
        documento: createClienteDto.documento,
      },
    });
    return newcliente;
  }

  async updateCliente(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const user = await this.prisma.cliente.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
    }

    return this.prisma.cliente.update({
      where: { id },
      data: {
        email: updateClienteDto.email,
        nome: updateClienteDto.nome,
        documento: updateClienteDto.documento,
      },
    });
  }

  async deleteCliente(id: number): Promise<Cliente> {
    const user = await this.prisma.cliente.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
    }

    return this.prisma.cliente.delete({
      where: { id },
    });
  }
  async findAll(): Promise<Cliente[]> {
    return this.prisma.cliente.findMany();
  }

  async findOne(id: number): Promise<Cliente | null> {
    return this.prisma.cliente.findUnique({
      where: { id },
    });
  }
}
