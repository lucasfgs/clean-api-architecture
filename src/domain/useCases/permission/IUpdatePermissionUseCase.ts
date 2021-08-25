import { IUpdatePermission } from '@domain/models/IPermission'

export interface IUpdatePermissionUseCase {
    update(permission: IUpdatePermission): Promise<void>
}
