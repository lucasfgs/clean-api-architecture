import { ICreatePermissionRole, IPermissionRole, IUpdatePermissionRole } from '@domain/models/IPermissionRole'
import { TOrder } from '@presentation/requests/GenericFilterRequest'

export interface IPermissionRoleRepository{
   findAll(order: TOrder, limit: number, offset: number): Promise<IPermissionRole[]>
   create(permissionRole: ICreatePermissionRole): Promise<IPermissionRole>
   update(permissionRole: IUpdatePermissionRole): Promise<void>
   delete(permissionId: number, roleId: number): Promise<void>
}
