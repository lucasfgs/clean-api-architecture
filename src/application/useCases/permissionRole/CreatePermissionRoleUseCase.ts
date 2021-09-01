import { IPermission } from '@domain/models/IPermission'
import { ICreatePermissionRole, IPermissionRole } from '@domain/models/IPermissionRole'
import { IRole } from '@domain/models/IRole'
import { IPermissionRoleRepository } from '@domain/repositories/IPermissionRoleRepository'
import { ICreatePermissionRoleUseCase } from '@domain/useCases/permissionRole/ICreatePermissionRoleUseCase'
import { DataAlreadyExistsError } from '@application/errors/DataAlreadyExistsError'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'

export class CreatePermissionRoleUseCase implements ICreatePermissionRoleUseCase {
  constructor (private readonly repository: IPermissionRoleRepository, private readonly validation: ValidationComposite<ICreatePermissionRole>) {
    this.repository = repository
    this.validation = validation
  }

  async create (requestModel: ICreatePermissionRole): Promise<IPermissionRole> {
    await this.validation.validate(requestModel)

    await this.checkPermisisonRoleExists(requestModel.permission, requestModel.role)

    return await this.repository.create(requestModel)
  }

  private async checkPermisisonRoleExists (permission: IPermission, role: IRole) {
    const permissionRole = await this.repository.findByPermissionAndRole(permission, role)

    if (permissionRole) {
      throw new DataAlreadyExistsError('Permission role already exists')
    }
  }
}
