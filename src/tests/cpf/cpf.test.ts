import { CPF } from '../../domain/entities/cpf';
import { DomainMessages } from '../../domain/utils/messages';

const createInstances = () => {
  const dirtyCPF = new CPF({
    cpf: '087.665.774-97'
  });

  const invalidCPF = new CPF({
    cpf: '087.665.888-94'
  });

  return {
    dirtyCPF,
    invalidCPF
  };
};

it('Should sanitize dirty cpf', () => {
  const { dirtyCPF } = createInstances();

  expect(dirtyCPF.cpf).toBe('08766577497');
});

it('Should throw an error since CPF is not valid', () => {
  const { invalidCPF } = createInstances();

  expect(() => {
    invalidCPF.validate();
  }).toThrow(DomainMessages.InvalidCPFError);
});
