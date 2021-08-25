import { IPermission } from '@domain/models/IPermission'

export type IFindAllPermissionsRequestModel = {
    order?: 'DESC' | 'ASC';
    limit?: number;
    offset?: number;
}

export interface IFindAllPermissionsUseCase {
    findAll(requestModel?: IFindAllPermissionsRequestModel): Promise<IPermission[]>
}
