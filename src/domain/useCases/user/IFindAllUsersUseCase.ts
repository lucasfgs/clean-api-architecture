import { IUser } from '@domain/models/IUser'
import { IGenericFilterRequestQuery } from '@presentation/requests/GenericFilterRequest'

export interface IFindAllUsersUseCase {
    findAll(requestModel: IGenericFilterRequestQuery): Promise<IUser[]>
}
