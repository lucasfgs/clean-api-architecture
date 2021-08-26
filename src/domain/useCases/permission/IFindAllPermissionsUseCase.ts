import { IPermission } from '@domain/models/IPermission'
import { IGenericFilterRequestQuery } from '@presentation/requests/GenericFilterRequest'
export interface IFindAllPermissionsUseCase {
    findAll(requestModel?: IGenericFilterRequestQuery): Promise<IPermission[]>
}
