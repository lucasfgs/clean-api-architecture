import { IPermission, IPermissionCreate } from '../models/IPermission'

export interface IPermissionRepository{
   create(permission: IPermissionCreate): Promise<IPermission>
}
