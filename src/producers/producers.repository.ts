import { EntityRepository, Repository } from "typeorm";
import { CreateProducerDto } from "./create-producer.dto";
import { Producer } from "./producer.entity";

@EntityRepository(Producer)
export class ProducerRepository extends Repository<Producer> {
  async createProducer (
    createProducerDto: CreateProducerDto
  ): Promise<Producer> {
    const { cpf_cnpj, producer_name, farm_name, city,
      state, total_area_farm, planting_area, vegetation_area } = createProducerDto;

    const producer = this.create();
    producer.cpf_cnpj = cpf_cnpj;
    producer.producer_name = producer_name;
    producer.farm_name = farm_name;
    producer.city = city;
    producer.state = state;
    producer.total_area_farm = total_area_farm;
    producer.planting_area = planting_area;
    producer.vegetation_area = vegetation_area;

    try {
      return await producer.save();
    } catch (error) {
      // if (error.code.toString() === '23505') {
      //   throw new ConflictException('Endereço de email já está em uso');
      // } else {
      //   throw new InternalServerErrorException(
      //     'Erro ao salvar o usuário no banco de dados',
      //   );
      // }
    }
  }
}
