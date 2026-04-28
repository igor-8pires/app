import { Test, TestingModule } from '@nestjs/testing';
import { PedidosService } from '../pedidos/pedidos.service';
import {beforeEach, describe, expect, it, jest} from '@jest/globals';

describe('PedidosService', () => {
  let service: PedidosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedidosService],
    }).compile();

    service = module.get<PedidosService>(PedidosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
