// kafka.producer.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { KafkaMessageDto } from './kafka-producer.dto';

@Injectable()
export class KafkaProducerService implements OnModuleInit {
  private readonly kafka = new Kafka({
    clientId: 'tiktok-webhook',
    brokers: ['localhost:19092'], // Redpanda is compatible with Kafka clients
  });

  private producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async sendMessage(messageDto: KafkaMessageDto) {
    console.log('Sending message to Kafka:', messageDto);
    await this.producer.send(messageDto);
    console.log('Message sent successfully');
  }
}
