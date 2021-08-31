import { IPermission } from '@domain/models/IPermission'
import { ICreatePermissionRole, IPermissionRole, IUpdatePermissionRole } from '@domain/models/IPermissionRole'
import { IRole } from '@domain/models/IRole'
import { TOrder } from '@application/protocols/requests/GenericFilterRequest'

export interface IPermissionRoleRepository{
   findAll(order: TOrder, limit: number, offset: number): Promise<IPermissionRole[]>
   findByRole(role: IRole): Promise<IPermissionRole[]>
   findByPermissionAndRole (permission: IPermission, role: IRole): Promise<IPermissionRole>
   create(permissionRole: ICreatePermissionRole): Promise<IPermissionRole>
   update(permissionRole: IUpdatePermissionRole): Promise<void>
   delete(permissionId: number, roleId: number): Promise<void>
}
