import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createPermissionTable1629604586335 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'permission',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false,
          length: '50'
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          isNullable: true
        }
      ]
    }), true)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('permission', true)
  }
}
