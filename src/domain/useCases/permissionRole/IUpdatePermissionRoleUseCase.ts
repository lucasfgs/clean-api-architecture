import { IUpdatePermissionRole } from '@domain/models/IPermissionRole'

export interface IUpdatePermissionRoleUseCase {
    update(role: IUpdatePermissionRole): Promise<void>
}
