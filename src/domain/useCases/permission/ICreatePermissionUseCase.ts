import { ICreatePermission, IPermission } from '@domain/models/IPermission'

export interface ICreatePermissionUseCase {
    create(requestModel: ICreatePermission): Promise<IPermission>
}
