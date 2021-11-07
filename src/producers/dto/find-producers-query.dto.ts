import { BaseQueryParamsDto } from "src/shared/dto/base-query-params.dto";

export class FindProducersQueryDto extends BaseQueryParamsDto {
  producer_name: string;
  farm_name: string;
  city: string;
  state: string;
}
