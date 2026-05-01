import { Module } from '@nestjs/common';
import { ItempedidoService } from './itempedido.service';
import { ItempedidoController } from './itempedido.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ItempedidoController],
  providers: [ItempedidoService],
})
export class ItempedidoModule {}
