import { Module } from '@nestjs/common';
import { KafkaProducerService } from './kafka-producer.service';
import { KafkaProducerController } from './kafka-producer.controller';

@Module({
  exports: [KafkaProducerService],
  controllers: [KafkaProducerController],
  providers: [KafkaProducerService],
})
export class KafkaProducerModule {}
