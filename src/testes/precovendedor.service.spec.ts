import { Test, TestingModule } from '@nestjs/testing';
import { PrecovendedorService } from './precovendedor.service';

describe('PrecovendedorService', () => {
  let service: PrecovendedorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrecovendedorService],
    }).compile();

    service = module.get<PrecovendedorService>(PrecovendedorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
