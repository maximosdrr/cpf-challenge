import { inject, injectable } from 'inversify';
import { InsertCPFRepository } from '../../../../../application/repositories/cpf/insert.repository';
import { CPF } from '../../../../../domain/entities/cpf';
import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { CPFEntity } from '../../orm-entities/cpf.entity';

@injectable()
export class InsertCPFRepositoryMikroOrmImpl implements InsertCPFRepository {
  constructor(@inject(SqlEntityRepository<CPFEntity>) private readonly cpfRepository: SqlEntityRepository<CPFEntity>) {}

  async execute(cpf: CPF): Promise<void> {
    const cpfToInsert = this.cpfRepository.create(cpf);
    await this.cpfRepository.nativeInsert(cpfToInsert);
  }
}
