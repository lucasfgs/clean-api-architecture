import { TOrder } from '@application/protocols/requests/GenericFilterRequest'
import { IPermission, ICreatePermission, IUpdatePermission } from '../models/IPermission'

export interface IPermissionRepository{
   create(permission: ICreatePermission): Promise<IPermission>
   findByName(name: string): Promise<IPermission>
   findAll(order: TOrder, limit: number, offset: number): Promise<IPermission[]>
   update(permission: IUpdatePermission): Promise<void>
   delete(id: number): Promise<void>
}
