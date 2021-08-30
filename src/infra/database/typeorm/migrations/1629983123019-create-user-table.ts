import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createUserTable1629983123019 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(new Table({
      name: 'user',
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
          length: '100'
        },
        {
          name: 'email',
          type: 'varchar',
          isNullable: false,
          length: '100'
        },
        {
          name: 'password',
          type: 'varchar',
          isNullable: false,
          length: '100'
        },
        {
          name: 'role',
          type: 'int',
          isNullable: false
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

    await queryRunner.createForeignKey('user', new TableForeignKey({
      name: 'fk_user_role',
      columnNames: ['role'],
      referencedColumnNames: ['id'],
      referencedTableName: 'role'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('user', 'fk_user_role')
    await queryRunner.dropTable('user', true)
  }
}
