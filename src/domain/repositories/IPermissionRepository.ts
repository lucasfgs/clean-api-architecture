import { IPermission, ICreatePermission } from '../models/IPermission'

export interface IPermissionRepository{
   create(permission: ICreatePermission): Promise<IPermission>
   findByName(name: string): Promise<IPermission>
   findAll(order: 'DESC' | 'ASC', limit: number, offset: number): Promise<IPermission[]>
}