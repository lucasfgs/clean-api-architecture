import { ICreateUser, IUser } from '@domain/models/IUser'

export interface ICreateUserUseCase {
    create(requestModel: ICreateUser): Promise<IUser>
}
