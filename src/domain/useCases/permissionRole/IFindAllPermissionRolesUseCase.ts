import { IPermissionRole } from '@domain/models/IPermissionRole'
import { IGenericFilterRequestQuery } from '@application/protocols/requests/GenericFilterRequest'

export interface IFindAllPermissionRolesUseCase {
    findAll(requestModel: IGenericFilterRequestQuery): Promise<IPermissionRole[]>
}
