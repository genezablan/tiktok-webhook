import { Controller } from '@nestjs/common';
import { KafkaProducerService } from './kafka-producer.service';

@Controller('kafka-producer')
export class KafkaProducerController {
  constructor(private readonly kafkaProducerService: KafkaProducerService) {}
}
