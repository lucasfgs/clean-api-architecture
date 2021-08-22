import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Permission } from './Permission'
import { Role } from './Role'

@Entity('permission_group', { schema: 'public' })
export class PermissionGroup {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'now()'
  })
  createdAt: Date;

  @Column('timestamp without time zone', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => Permission, (permission) => permission.permissionGroups)
  @JoinColumn([{ name: 'permission', referencedColumnName: 'id' }])
  permission: Permission;

  @ManyToOne(() => Role, (role) => role.permissionGroups)
  @JoinColumn([{ name: 'role', referencedColumnName: 'id' }])
  role: Role;
}
