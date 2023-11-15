import { CPFValidator } from '../../domain/rules/cpf-validator';

it('Should return true since cpf is valid', () => {
  const validCPF = '666.142.110-05';
  CPFValidator.isValid(validCPF);
});

it('Should return false since cpf is invalid', () => {
  const invalidCPF = '666.142.111-05';
  CPFValidator.isValid(invalidCPF);
});
