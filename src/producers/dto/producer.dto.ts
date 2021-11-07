import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class ProducerDto {
  cpf_cnpj: string;

  @MinLength(3, {
    message: 'O nome do produtor ter no mínimo 3 caracteres',
  })
  @MaxLength(100, {
    message: 'O nome do produtor deve ter menos de 100 caracteres',
  })
  @IsNotEmpty({ message: 'Informe o nome do produtor' })
  producer_name: string;

  @MinLength(3, {
    message: 'O nome da fazenda ter no mínimo 3 caracteres',
  })
  @MaxLength(100, {
    message: 'O nome da fazenda deve ter menos de 100 caracteres',
  })
  @IsNotEmpty({ message: 'Informe o nome da fazenda' })
  farm_name: string;

  @IsNotEmpty({ message: 'Informe a cidade' })
  city: string;

  @IsNotEmpty({ message: 'Informe o estado' })
  state: string;

  @IsNotEmpty({ message: 'Informe a área total em hectares da fazenda' })
  total_area_farm: number;
  
  @IsNotEmpty({ message: 'Informe a área agricultável em hectares' })
  planting_area: number;

  @IsNotEmpty({ message: 'Informe a área de vegetação em hectares' })
  vegetation_area: number;
}
