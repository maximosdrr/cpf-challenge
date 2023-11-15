import { inject, injectable } from 'inversify';
import { DeleteCPFRepository } from '../../../../../application/repositories/cpf/delete.repository';
import { CPF } from '../../../../../domain/entities/cpf';
import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { CPFEntity } from '../../orm-entities/cpf.entity';

@injectable()
export class DeleteCPFRepositoryMikroOrmImpl implements DeleteCPFRepository {
  constructor(@inject(SqlEntityRepository<CPFEntity>) private readonly cpfRepository: SqlEntityRepository<CPFEntity>) {}

  async execute(cpf: CPF): Promise<void> {
    await this.cpfRepository.nativeDelete({
      cpf: cpf.cpf
    });
  }
}
