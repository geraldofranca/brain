import { Validation } from "../protocols/validation";
import { cpf } from 'cpf-cnpj-validator';

export class CpfValidator implements Validation {
  isValid (input: any): Boolean {
    return cpf.isValid(input);
  }
}
