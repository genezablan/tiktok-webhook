export class KafkaMessageDto {
  topic: string;
  messages: {
    key: string;
    value: string;
    partition?: number;
  }[];
}
