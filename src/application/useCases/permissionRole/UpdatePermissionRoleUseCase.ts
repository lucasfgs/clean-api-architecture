import { IUpdatePermissionRole } from '@domain/models/IPermissionRole'
import { IPermissionRoleRepository } from '@domain/repositories/IPermissionRoleRepository'
import { IUpdatePermissionRoleUseCase } from '@domain/useCases/permissionRole/IUpdatePermissionRoleUseCase'
import { ValidationComposite } from '@presentation/protocols/ValidationComposite'

export class UpdatePermissionRoleUseCase implements IUpdatePermissionRoleUseCase {
  constructor (private readonly repository: IPermissionRoleRepository, private readonly validation: ValidationComposite<IUpdatePermissionRole>) {
    this.repository = repository
    this.validation = validation
  }

  async update (permissionrole: IUpdatePermissionRole): Promise<void> {
    await this.validation.validate(permissionrole)

    await this.repository.update(permissionrole)
  }
}
