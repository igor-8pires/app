import { Test, TestingModule } from '@nestjs/testing';
import { PrecovendedorController } from './precovendedor.controller';
import { PrecovendedorService } from './precovendedor.service';

describe('PrecovendedorController', () => {
  let controller: PrecovendedorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrecovendedorController],
      providers: [PrecovendedorService],
    }).compile();

    controller = module.get<PrecovendedorController>(PrecovendedorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
