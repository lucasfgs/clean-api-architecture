import { IUpdateRole } from '@domain/models/IRole'

export interface IUpdateRoleUseCase {
    update(role: IUpdateRole): Promise<void>
}
