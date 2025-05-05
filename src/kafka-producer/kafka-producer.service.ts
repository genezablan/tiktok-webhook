// kafka.producer.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, KafkaConfig, Producer, SASLOptions } from 'kafkajs';
import { KafkaMessageDto } from './kafka-producer.dto';
import { ConfigService } from '@nestjs/config';
import { KafkaClientConfigService } from './kafka.config';
@Injectable()
export class KafkaProducerService implements OnModuleInit {
  private kafka: Kafka;
  private producer: Producer;

  constructor(
    private readonly configService: ConfigService,
    private readonly kafkaClientConfigService: KafkaClientConfigService,
  ) {
    const config = this.kafkaClientConfigService.getKafkaConfig();
    this.kafka = new Kafka(config);
    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async sendMessage(messageDto: KafkaMessageDto) {
    console.log('Sending message to Kafka:', messageDto);
    await this.producer.send(messageDto);
    console.log('Message sent successfully');
  }

  getKafkaConfig(): KafkaConfig {
    const provider = this.configService.get<string>('KAFKA_PROVIDER', 'local');

    const brokers: string[] =
      this.configService.get<string>('KAFKA_BROKERS')?.split(',') ?? [];

    const clientId: string = this.configService.get('KAFKA_CLIENT_ID') ?? '';

    if (!clientId) {
      throw new Error(
        'KAFKA_CLIENT_ID is not set in the environment variables',
      );
    }
    if (brokers.length === 0) {
      throw new Error('KAFKA_BROKERS is not set in the environment variables');
    }

    if (brokers.length < 1) {
      throw new Error(
        'KAFKA_BROKERS must contain at least 1 broker for local provider',
      );
    }

    const common: KafkaConfig = {
      clientId: this.configService.get('KAFKA_CLIENT_ID', 'tiktok-webhook'),
      brokers,
      connectionTimeout: 3000,
      retry: {
        initialRetryTime: 300,
        retries: 5,
      },
    };

    if (provider === 'aws') {
      common.ssl = true;
      const username: string =
        this.configService.get('KAFKA_SASL_USERNAME') ?? '';
      const password: string =
        this.configService.get('KAFKA_SASL_PASSWORD') ?? '';

      const mechanism: 'plain' | 'scram-sha-256' | 'scram-sha-512' =
        this.configService.get<'plain' | 'scram-sha-256' | 'scram-sha-512'>(
          'KAFKA_SASL_MECHANISM',
          'plain',
        );

      const sasl: SASLOptions = {
        mechanism,
        username,
        password,
      };

      if (username && password) {
        common.sasl = sasl;
      }
    }

    return common;
  }
}
