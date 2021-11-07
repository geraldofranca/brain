import { Producer } from "../entities/producer.entity";

export class ReturnProcuderDto {
  statusCode: number;
  producer: Producer;
  message: string;
}
