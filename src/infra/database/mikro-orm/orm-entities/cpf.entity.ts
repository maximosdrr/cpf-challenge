import { Property, PrimaryKey, Entity } from '@mikro-orm/core';

import { CPFProps } from '../../../../domain/interfaces/cpf-props';

@Entity()
export class CPFEntity implements CPFProps {
  @PrimaryKey()
  id!: number;

  @Property()
  createdAt?: Date = new Date();

  @Property()
  cpf!: string;
}
