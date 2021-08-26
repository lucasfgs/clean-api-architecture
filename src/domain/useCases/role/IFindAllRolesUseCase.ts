import { IRole } from '@domain/models/IRole'
import { IGenericFilterRequestQuery } from '@presentation/requests/GenericFilterRequest'

export interface IFindAllRolesUseCase {
    findAll(requestModel: IGenericFilterRequestQuery): Promise<IRole[]>
}
