import { Module } from '@nestjs/common';
import { PrecovendedorService } from './precovendedor.service';
import { PrecovendedorController } from './precovendedor.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PrecovendedorController],
  providers: [PrecovendedorService],
})
export class PrecovendedorModule {}
