import { Validation } from "../protocols/validation";
import { cnpj } from 'cpf-cnpj-validator';

export class CnpjValidator implements Validation {
  isValid (input: any): Boolean {
    return cnpj.isValid(input);
  }
}
