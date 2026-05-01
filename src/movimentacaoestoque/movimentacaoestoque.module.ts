import { Module } from '@nestjs/common';
import { MovimentacaoestoqueService } from './movimentacaoestoque.service';
import { MovimentacaoestoqueController } from './movimentacaoestoque.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MovimentacaoestoqueController],
  providers: [MovimentacaoestoqueService],
})
export class MovimentacaoestoqueModule {}
