import { Test, TestingModule } from '@nestjs/testing';
import { MovimentacaoestoqueController } from './movimentacaoestoque.controller';
import { MovimentacaoestoqueService } from './movimentacaoestoque.service';

describe('MovimentacaoestoqueController', () => {
  let controller: MovimentacaoestoqueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovimentacaoestoqueController],
      providers: [MovimentacaoestoqueService],
    }).compile();

    controller = module.get<MovimentacaoestoqueController>(MovimentacaoestoqueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
