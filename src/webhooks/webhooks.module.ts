import { Module } from '@nestjs/common';
import { KafkaProducerModule } from 'src/kafka-producer/kafka-producer.module';
import { WebhooksController } from './webhooks.controller';

@Module({
  imports: [KafkaProducerModule],
  controllers: [WebhooksController],
})
export class WebhooksModule {}
