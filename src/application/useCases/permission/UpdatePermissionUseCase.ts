import { ICreatePermission, IUpdatePermission } from '@domain/models/IPermission'
import { IPermissionRepository } from '@domain/repositories/IPermissionRepository'
import { IUpdatePermissionUseCase } from '@domain/useCases/permission/IUpdatePermissionUseCase'
import { DataAlreadyExistsError } from '@presentation/errors/DataAlreadyExistsError'
import { ValidationComposite } from '@presentation/protocols/ValidationComposite'

export class UpdatePermissionUseCase implements IUpdatePermissionUseCase {
  constructor (private readonly permissionRepository: IPermissionRepository, private readonly validation: ValidationComposite<ICreatePermission>) {
    this.permissionRepository = permissionRepository
    this.validation = validation
  }

  async update (requestModel: IUpdatePermission): Promise<void> {
    await this.validation.validate(requestModel)

    const permission = await this.permissionRepository.findByName(requestModel.name)

    if (permission) { throw new DataAlreadyExistsError('Permission already exists') }

    await this.permissionRepository.update(requestModel)
  }
}
