import { IPermission } from './IPermission'
import { IRole } from './IRole'

export interface IPermissionRole {
id?: number,
create: boolean,
read: boolean,
update: boolean,
delete: boolean,
permission: IPermission,
role: IRole,
createdAt?: Date,
updatedAt?: Date | null,
}

export type ICreatePermissionRole = Omit<IPermissionRole, 'id' | 'createdAt' | 'updatedAt'>

export type IUpdatePermissionRole = Omit<IPermissionRole, 'createdAt' | 'updatedAt' >
