import { inject, injectable } from 'inversify';
import { CPF } from '../../../../../domain/entities/cpf';
import { CPFEntity } from '../../orm-entities/cpf.entity';
import { SqlEntityRepository } from '@mikro-orm/postgresql';
import {
  FindAllCPFParams,
  FindAllCPFRepository
} from '../../../../../application/repositories/cpf/find-all.repository';
import { PaginationUtils } from '../../../../../application/utils/database/pagination';

@injectable()
export class FindAllCPFRepositoryMikroOrmImpl implements FindAllCPFRepository {
  constructor(@inject(SqlEntityRepository<CPFEntity>) private readonly cpfRepository: SqlEntityRepository<CPFEntity>) {}

  async execute(data: FindAllCPFParams): Promise<CPF[] | null> {
    const { offset, limit } = PaginationUtils.generatePaginationForSql(data.page, data.limit);

    const result = await this.cpfRepository.findAll({
      offset,
      limit
    });

    return result.map((cpf) => {
      const cpfEntity = CPF.fromObject(cpf);
      cpfEntity.removeProp('id');
      return cpfEntity;
    });
  }
}
