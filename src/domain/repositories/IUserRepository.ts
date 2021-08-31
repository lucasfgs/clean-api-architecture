import { ICreateUser, IUpdateUser, IUser } from '@domain/models/IUser'
import { TOrder } from '@application/protocols/requests/GenericFilterRequest'

export interface IUserRepository {
    create (user: ICreateUser): Promise<IUser>
    findAll (order: TOrder, limit: number, offset: number): Promise<IUser[]>
    findUserPermissionsById (id: number): Promise<IUser>
    findByEmail (email: string): Promise<IUser>
    update (user: IUpdateUser): Promise<void>
    delete (id: number): Promise<void>
}
