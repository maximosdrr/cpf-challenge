import { Migration } from '@mikro-orm/migrations';

export class Migration20231114152810 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "cpfentity" ("id" serial primary key, "created_at" timestamptz(0) not null, "cpf" varchar(255) not null);'
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "cpfentity" cascade;');
  }
}
