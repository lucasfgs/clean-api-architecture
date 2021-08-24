import { ICreatePermission, IPermission } from '@data/models/IPermission'

export interface ICreatePermissionUseCase {
    create(requestModel: ICreatePermission): Promise<IPermission>
}
