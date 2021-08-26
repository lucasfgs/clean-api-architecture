import { IPermissionRole } from '@domain/models/IPermissionRole'
import { IGenericFilterRequestQuery } from '@presentation/requests/GenericFilterRequest'

export interface IFindAllPermissionRolesUseCase {
    findAll(requestModel: IGenericFilterRequestQuery): Promise<IPermissionRole[]>
}
