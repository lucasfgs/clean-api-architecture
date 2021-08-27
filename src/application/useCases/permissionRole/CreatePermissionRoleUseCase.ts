import { ICreatePermissionRole, IPermissionRole } from '@domain/models/IPermissionRole'
import { IPermissionRoleRepository } from '@domain/repositories/IPermissionRoleRepository'
import { ICreatePermissionRoleUseCase } from '@domain/useCases/permissionRole/ICreatePermissionRoleUseCase'
import { DataAlreadyExistsError } from '@presentation/errors/DataAlreadyExistsError'
import { ValidationComposite } from '@presentation/protocols/ValidationComposite'

export class CreatePermissionRoleUseCase implements ICreatePermissionRoleUseCase {
  constructor (private readonly repository: IPermissionRoleRepository, private readonly validation: ValidationComposite<ICreatePermissionRole>) {
    this.repository = repository
    this.validation = validation
  }

  async create (requestModel: ICreatePermissionRole): Promise<IPermissionRole> {
    await this.validation.validate(requestModel)

    const permissionRole = await this.repository.findByPermissionAndRole(requestModel.permission, requestModel.role)

    if (permissionRole) {
      throw new DataAlreadyExistsError('Permission role already exists')
    }

    return await this.repository.create(requestModel)
  }
}
