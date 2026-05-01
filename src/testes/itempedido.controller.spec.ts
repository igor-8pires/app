import { Test, TestingModule } from '@nestjs/testing';
import { ItempedidoController } from './itempedido.controller';
import { ItempedidoService } from './itempedido.service';

describe('ItempedidoController', () => {
  let controller: ItempedidoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItempedidoController],
      providers: [ItempedidoService],
    }).compile();

    controller = module.get<ItempedidoController>(ItempedidoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
