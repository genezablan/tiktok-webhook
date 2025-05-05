// webhook.dto.ts
import { IsBoolean, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class WebhookDataDto {
  @IsString()
  order_id: string;

  @IsString()
  order_status: string;

  @IsBoolean()
  is_on_hold_order: boolean;

  @IsNumber()
  update_time: number;
}

export class TiktokWebhookDto {
  @IsNumber()
  type: number;

  @IsString()
  tts_notification_id: string;

  @IsString()
  shop_id: string;

  @IsNumber()
  timestamp: number;

  @ValidateNested()
  @Type(() => WebhookDataDto)
  data: WebhookDataDto;
}
