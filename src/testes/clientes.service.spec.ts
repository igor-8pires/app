import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from '../clientes/clientes.service';
import {beforeEach, describe, expect, it, jest} from '@jest/globals';

describe('ClientesService', () => {
  let service: ClientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientesService],
    }).compile();

    service = module.get<ClientesService>(ClientesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
