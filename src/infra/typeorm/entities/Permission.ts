import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { PermissionGroup } from './PermissionGroup'

@Entity('permission', { schema: 'public' })
export class Permission {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 50 })
  name: string;

  @Column('boolean', { name: 'create', default: () => 'false' })
  create: boolean;

  @Column('boolean', { name: 'read', default: () => 'false' })
  read: boolean;

  @Column('boolean', { name: 'update', default: () => 'false' })
  update: boolean;

  @Column('boolean', { name: 'delete', default: () => 'false' })
  delete: boolean;

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'now()'
  })
  createdAt: Date;

  @Column('timestamp without time zone', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @OneToMany(
    () => PermissionGroup,
    (permissionGroup) => permissionGroup.permission
  )
  permissionGroups: PermissionGroup[];
}
