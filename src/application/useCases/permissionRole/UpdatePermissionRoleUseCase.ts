import { IPermission } from '@domain/models/IPermission'
import { IUpdatePermissionRole } from '@domain/models/IPermissionRole'
import { IRole } from '@domain/models/IRole'
import { IPermissionRoleRepository } from '@domain/repositories/IPermissionRoleRepository'
import { IUpdatePermissionRoleUseCase } from '@domain/useCases/permissionRole/IUpdatePermissionRoleUseCase'
import { NotFoundError } from '@application/errors/NotFoundError'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'

export class UpdatePermissionRoleUseCase implements IUpdatePermissionRoleUseCase {
  constructor (private readonly repository: IPermissionRoleRepository, private readonly validation: ValidationComposite<IUpdatePermissionRole>) {
    this.repository = repository
    this.validation = validation
  }

  async update (permissonRole: IUpdatePermissionRole): Promise<void> {
    await this.validation.validate(permissonRole)

    const permissionRoleExists = await this.checkPermisisonRoleExists(permissonRole.permission, permissonRole.role)

    permissonRole.id = permissionRoleExists.id

    await this.repository.update(permissonRole)
  }

  private async checkPermisisonRoleExists (permission: IPermission, role: IRole) {
    const permissionRoleExists = await this.repository.findByPermissionAndRole(permission, role)

    if (!permissionRoleExists) { throw new NotFoundError('Permission or role not exists') }

    return permissionRoleExists
  }
}
