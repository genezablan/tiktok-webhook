import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WebhooksController } from './webhooks/webhooks.controller';
import { KafkaProducerModule } from './kafka-producer/kafka-producer.module';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    KafkaProducerModule,
    WebhooksModule,
  ],
  controllers: [AppController, WebhooksController],
  providers: [AppService],
})
export class AppModule {}
