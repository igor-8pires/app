import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from '../clientes/clientes.module';
import { ProdutosModule } from '../produtos/produtos.module';
import { VendedoresModule } from '../vendedores/vendedores.module';
import { PedidosModule } from '../pedidos/pedidos.module';

@Module({
  imports: [ClientesModule, ProdutosModule, VendedoresModule, PedidosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
