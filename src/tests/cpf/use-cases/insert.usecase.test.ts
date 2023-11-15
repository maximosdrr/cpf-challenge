/* eslint-disable @typescript-eslint/no-explicit-any */

import { InsertCpfUseCase } from '../../../application/use-cases/cpf/insert/index';
import { CPF } from '../../../domain/entities/cpf';
import { DomainMessages } from '../../../domain/utils/messages';

const createInstances = () => {
  const insertRepositoryMock = {
    execute: jest.fn(() => null)
  } as any;

  const findOneRepositoryMock = {
    execute: jest.fn(() => null)
  } as any;

  const insertUseCase = new InsertCpfUseCase(insertRepositoryMock, findOneRepositoryMock);

  return {
    insertRepositoryMock,
    findOneRepositoryMock,
    insertUseCase
  };
};

it('Should call findOne repository correctly', async () => {
  const { findOneRepositoryMock, insertUseCase } = createInstances();

  await insertUseCase.execute({
    content: {
      cpf: '087.665.774-97'
    }
  });

  expect(findOneRepositoryMock.execute).toHaveBeenCalledTimes(1);
});

it('Should throw an error since CPF already exists', async () => {
  const { findOneRepositoryMock, insertUseCase } = createInstances();

  jest.spyOn(findOneRepositoryMock, 'execute').mockImplementation(() => new CPF({ cpf: '087.665.774-97' }));

  try {
    await insertUseCase.execute({
      content: {
        cpf: '087.665.774-97'
      }
    });
  } catch (e) {
    expect(e).toBe(DomainMessages.ExistsCPFError);
  }
});

it('Should throw an error since CPF is invalid', async () => {
  const { insertUseCase } = createInstances();

  try {
    await insertUseCase.execute({
      content: {
        cpf: '087.665.774-95'
      }
    });
  } catch (e) {
    expect(e).toBe(DomainMessages.InvalidCPFError);
  }
});
