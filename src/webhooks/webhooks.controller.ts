import { Body, Controller, Get, Post } from '@nestjs/common';
import { TiktokWebhookDto } from './webhooks.dto';
import { KafkaProducerService } from '../kafka-producer/kafka-producer.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly kafkaProducerService: KafkaProducerService) {}

  @Get('tiktok')
  getTiktokWebhook() {
    return {
      message: 'Tiktok webhook endpoint',
    };
  }

  @Post('tiktok')
  async handleTiktokWebhook(@Body() body: TiktokWebhookDto) {
    // Handle the incoming webhook data from Tiktok
    console.log('Received Tiktok webhook:', body);
    await this.kafkaProducerService.sendMessage({
      topic: 'tiktok-webhooks',
      messages: [
        {
          key: body.tts_notification_id,
          value: JSON.stringify(body),
        },
      ],
    });
    console.log('Message sent to Kafka successfully');
    return {
      message: 'Tiktok webhook received',
    };
  }
}
