import { IPermission } from '@domain/models/IPermission'
import { IGenericFilterRequestQuery } from '@application/protocols/requests/GenericFilterRequest'
export interface IFindAllPermissionsUseCase {
    findAll(requestModel?: IGenericFilterRequestQuery): Promise<IPermission[]>
}
