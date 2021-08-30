import { ICreateRole, IRole, IUpdateRole } from '@domain/models/IRole'
import { TOrder } from '@application/protocols/requests/GenericFilterRequest'

export interface IRoleRepository {
    create (role: ICreateRole): Promise<IRole>
    findById (id: number): Promise<IRole>
    findByName (name: string): Promise<IRole>
    findAll (order: TOrder, limit: number, offset: number): Promise<IRole[]>
    update (role: IUpdateRole): Promise<void>
    delete (id: number): Promise<void>
}
