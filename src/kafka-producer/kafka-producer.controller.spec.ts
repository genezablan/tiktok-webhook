import { Test, TestingModule } from '@nestjs/testing';
import { KafkaProducerController } from './kafka-producer.controller';
import { KafkaProducerService } from './kafka-producer.service';

describe('KafkaProducerController', () => {
  let controller: KafkaProducerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KafkaProducerController],
      providers: [KafkaProducerService],
    }).compile();

    controller = module.get<KafkaProducerController>(KafkaProducerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
