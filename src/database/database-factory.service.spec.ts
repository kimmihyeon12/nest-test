import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseFactoryService } from './database-factory.service';

describe('DatabaseFactoryService', () => {
  let service: DatabaseFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseFactoryService],
    }).compile();

    service = module.get<DatabaseFactoryService>(DatabaseFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
