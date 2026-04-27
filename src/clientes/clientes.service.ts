
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Cliente, Prisma } from '../generated/prisma/client';

@Injectable()
export class ClientesService {
  constructor(private readonly prisma: PrismaService) { }

  async createUser(createClienteDto: CreateClienteDto): Promise<Cliente> {
    console.log('Criando cliente com os seguintes dados:', createClienteDto);
    const cliente = await this.prisma.cliente.findUnique({
      where: {
        email: createClienteDto.email,
      },
    });

    if (cliente) {
      throw new HttpException('Email já cadastrado', HttpStatus.BAD_REQUEST);
    }
    const clienteDocumento = await this.prisma.cliente.findUnique({
      where: {
        documento: createClienteDto.documento,
      },
    });
    if(clienteDocumento){
      throw new HttpException('Documento já cadastrado', HttpStatus.BAD_REQUEST);
    }

    const newcliente = await this.prisma.cliente.create({
      data: {
        email: createClienteDto.email,
        nome: createClienteDto.nome,
        documento: createClienteDto.documento,
      },
    });
    console.log('Cliente criado:', newcliente);
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
