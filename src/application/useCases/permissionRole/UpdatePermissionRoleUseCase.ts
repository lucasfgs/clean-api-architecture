import { IUpdatePermissionRole } from '@domain/models/IPermissionRole'
import { IPermissionRoleRepository } from '@domain/repositories/IPermissionRoleRepository'
import { IUpdatePermissionRoleUseCase } from '@domain/useCases/permissionRole/IUpdatePermissionRoleUseCase'
import { RepositoryError } from '@presentation/errors/RepositoryError'
import { ValidationComposite } from '@presentation/protocols/ValidationComposite'

export class UpdatePermissionRoleUseCase implements IUpdatePermissionRoleUseCase {
  constructor (private readonly repository: IPermissionRoleRepository, private readonly validation: ValidationComposite<IUpdatePermissionRole>) {
    this.repository = repository
    this.validation = validation
  }

  async update (permissonRole: IUpdatePermissionRole): Promise<void> {
    await this.validation.validate(permissonRole)

    const permissionRoleExists = await this.repository.findByPermissionAndRole(permissonRole.permission, permissonRole.role)

    console.log(permissonRole)

    if (!permissionRoleExists) { throw new RepositoryError('Permission role not exists') }

    permissonRole.id = permissionRoleExists.id

    await this.repository.update(permissonRole)
  }
}
