import { Validation } from "../protocols/validation";
import { cnpj, cpf } from 'cpf-cnpj-validator';

export class CpfCnpjValidator implements Validation {
  isValid (input: any): Boolean {
    if (input.length == 11) {
      return cpf.isValid(input);
    } else {
      return cnpj.isValid(input);
    }
  }
}
