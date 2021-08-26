import { ICreatePermissionRole, IPermissionRole } from '@domain/models/IPermissionRole'

export interface ICreatePermissionRoleUseCase {
    create(requestModel: ICreatePermissionRole): Promise<IPermissionRole>
}
