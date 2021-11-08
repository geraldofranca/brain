import { IsNotEmpty } from 'class-validator';

export class CreateCultureDto {
  @IsNotEmpty({ message: 'Informe o nome do produtor' })
  name: string;
}
