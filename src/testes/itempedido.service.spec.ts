import { Test, TestingModule } from '@nestjs/testing';
import { ItempedidoService } from './itempedido.service';

describe('ItempedidoService', () => {
  let service: ItempedidoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItempedidoService],
    }).compile();

    service = module.get<ItempedidoService>(ItempedidoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
