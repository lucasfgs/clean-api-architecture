import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Permission } from './Permission'
import { Role } from './Role'

@Entity('permission_role', { schema: 'public' })
export class PermissionRole {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

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

  @ManyToOne(() => Permission, (permission) => permission.permissionRoles)
  @JoinColumn([{ name: 'permission', referencedColumnName: 'id' }])
  permission: Permission;

  @ManyToOne(() => Role, (role) => role.permissionRoles)
  @JoinColumn([{ name: 'role', referencedColumnName: 'id' }])
  role: Role;
}
