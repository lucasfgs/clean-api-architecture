import { ICreatePermissionRole, IPermissionRole } from '@domain/models/IPermissionRole'
import { IPermissionRoleRepository } from '@domain/repositories/IPermissionRoleRepository'
import { ICreatePermissionRoleUseCase } from '@domain/useCases/permissionRole/ICreatePermissionRoleUseCase'
import { ValidationComposite } from '@presentation/protocols/ValidationComposite'

export class CreatePermissionRoleUseCase implements ICreatePermissionRoleUseCase {
  constructor (private readonly repository: IPermissionRoleRepository, private readonly validation: ValidationComposite<ICreatePermissionRole>) {
    this.repository = repository
    this.validation = validation
  }

  async create (requestModel: ICreatePermissionRole): Promise<IPermissionRole> {
    await this.validation.validate(requestModel)

    return await this.repository.create(requestModel)
  }
}
