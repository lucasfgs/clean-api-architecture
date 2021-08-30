import { IUser } from '@domain/models/IUser'
import { IGenericFilterRequestQuery } from '@application/protocols/requests/GenericFilterRequest'

export interface IFindAllUsersUseCase {
    findAll(requestModel: IGenericFilterRequestQuery): Promise<IUser[]>
}
