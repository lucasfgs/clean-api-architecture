import { IUpdateUser } from '@domain/models/IUser'

export interface IUpdateUserUseCase {
    update(role: IUpdateUser): Promise<void>
}
