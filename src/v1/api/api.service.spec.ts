import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ApiService],
    }).compile();

    service = module.get<ApiService>(ApiService);
    console.log(service.toString());
    await service.auth();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
