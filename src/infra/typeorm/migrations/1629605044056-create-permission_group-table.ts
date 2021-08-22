import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createPermissionGroupTable1629605044056 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'permission_group',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'permission',
          type: 'int',
          isNullable: false
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

    await queryRunner.createForeignKey('permission_group', new TableForeignKey({
      name: 'fk_permission_group_permission',
      columnNames: ['permission'],
      referencedColumnNames: ['id'],
      referencedTableName: 'permission'
    }))

    await queryRunner.createForeignKey('permission_group', new TableForeignKey({
      name: 'fk_permission_group_role',
      columnNames: ['role'],
      referencedColumnNames: ['id'],
      referencedTableName: 'role'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('permission_group')
    await queryRunner.dropForeignKey('permission_group', 'fk_permission_group_permission')
    await queryRunner.dropForeignKey('permission_group', 'fk_permission_group_role')
  }
}
