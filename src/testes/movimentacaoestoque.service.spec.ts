import { Test, TestingModule } from '@nestjs/testing';
import { MovimentacaoestoqueService } from './movimentacaoestoque.service';

describe('MovimentacaoestoqueService', () => {
  let service: MovimentacaoestoqueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovimentacaoestoqueService],
    }).compile();

    service = module.get<MovimentacaoestoqueService>(MovimentacaoestoqueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
