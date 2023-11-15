import { inject, injectable } from 'inversify';
import { FindOneCPFRepository } from '../../../../../application/repositories/cpf/find-one.repository';
import { CPF } from '../../../../../domain/entities/cpf';
import { CPFEntity } from '../../orm-entities/cpf.entity';
import { SqlEntityRepository } from '@mikro-orm/postgresql';

@injectable()
export class FindOneCPFRepositoryMikroOrmImpl implements FindOneCPFRepository {
  constructor(@inject(SqlEntityRepository<CPFEntity>) private readonly cpfRepository: SqlEntityRepository<CPFEntity>) {}

  async execute(cpf: CPF): Promise<CPF | null> {
    const foundCPF = await this.cpfRepository.findOne({
      cpf: cpf.cpf
    });

    if (!foundCPF) return null;

    const cpfEntity = CPF.fromObject({
      cpf: foundCPF.cpf,
      createdAt: foundCPF.createdAt,
      id: foundCPF.id
    });

    cpfEntity.removeProp('id');

    return cpfEntity;
  }
}
