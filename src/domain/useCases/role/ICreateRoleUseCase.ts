import { ICreateRole, IRole } from '@domain/models/IRole'

export interface ICreateRoleUseCase {
    create(requestModel: ICreateRole): Promise<IRole>
}
