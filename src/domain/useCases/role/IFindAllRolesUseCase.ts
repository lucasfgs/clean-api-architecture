import { IRole } from '@domain/models/IRole'
import { IGenericFilterRequestQuery } from '@application/protocols/requests/GenericFilterRequest'

export interface IFindAllRolesUseCase {
    findAll(requestModel: IGenericFilterRequestQuery): Promise<IRole[]>
}
