import { IPermission } from '../../../data/models/IPermission'

export type TCreatePermissionRequestModel = {
    name: string;
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
}

export interface ICreatePermissionUseCase {
    create(requestModel: TCreatePermissionRequestModel): Promise<IPermission>
}
