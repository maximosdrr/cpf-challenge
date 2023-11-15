/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteCpfUseCase } from '../../../application/use-cases/cpf/delete';
import { CPF } from '../../../domain/entities/cpf';
import { DomainMessages } from '../../../domain/utils/messages';

const createInstances = () => {
  const deleteRepositoryMock = {
    execute: jest.fn(() => null)
  } as any;

  const findOneRepositoryMock = {
    execute: jest.fn(() => null)
  } as any;

  const deleteUseCase = new DeleteCpfUseCase(findOneRepositoryMock, deleteRepositoryMock);

  return {
    deleteRepositoryMock,
    findOneRepositoryMock,
    deleteUseCase
  };
};

it('Should call findOne repository correctly', async () => {
  const { findOneRepositoryMock, deleteUseCase } = createInstances();

  await deleteUseCase.execute({
    content: {
      cpf: '087.665.774-97'
    }
  });

  expect(findOneRepositoryMock.execute).toHaveBeenCalledTimes(1);
});

it('Should throw an error since CPF does not exists', async () => {
  const { findOneRepositoryMock, deleteUseCase } = createInstances();

  jest.spyOn(findOneRepositoryMock, 'execute').mockImplementation(() => new CPF({ cpf: '087.665.774-97' }));

  try {
    await deleteUseCase.execute({
      content: {
        cpf: '087.665.774-97'
      }
    });
  } catch (e) {
    expect(e).toBe(DomainMessages.NotFoundCPFError);
  }
});

it('Should throw an error since CPF is not valid', async () => {
  const { findOneRepositoryMock, deleteUseCase } = createInstances();

  jest.spyOn(findOneRepositoryMock, 'execute').mockImplementation(() => new CPF({ cpf: '087.665.774-97' }));

  try {
    await deleteUseCase.execute({
      content: {
        cpf: '087.665.774-95'
      }
    });
  } catch (e) {
    expect(e).toBe(DomainMessages.InvalidCPFError);
  }
});
