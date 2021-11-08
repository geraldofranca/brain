import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateCultureDto } from "./dto/create-culture.dto";
import { Culture } from "./entities/culture.entity";

@EntityRepository(Culture)
export class CultureRepository extends Repository<Culture> {

  async createCulture (
    createCultureDto: CreateCultureDto
  ): Promise<Culture> {
    const { name } = createCultureDto;

    const cultureObj = this.create();
    cultureObj.name = name;

    try {
      return await cultureObj.save();
    } catch (error) {
        throw new InternalServerErrorException(
          'Erro ao salvar o registro da cultura',
        );
    }
  }
}
