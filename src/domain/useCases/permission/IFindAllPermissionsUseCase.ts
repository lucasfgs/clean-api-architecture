import { IPermission } from '@domain/models/IPermission'

export type IFindAllPermissionsRequestModel = {
    order?: 'desc' | 'asc';
    limit?: number;
    offset?: number;
}

export interface IFindAllPermissionsUseCase {
    findAll(requestModel?: IFindAllPermissionsRequestModel): Promise<IPermission[]>
}
