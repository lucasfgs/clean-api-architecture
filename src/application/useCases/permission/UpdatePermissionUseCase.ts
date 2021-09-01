import { ICreatePermission, IUpdatePermission } from '@domain/models/IPermission'
import { IPermissionRepository } from '@domain/repositories/IPermissionRepository'
import { IUpdatePermissionUseCase } from '@domain/useCases/permission/IUpdatePermissionUseCase'
import { DataAlreadyExistsError } from '@application/errors/DataAlreadyExistsError'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'

export class UpdatePermissionUseCase implements IUpdatePermissionUseCase {
  constructor (private readonly permissionRepository: IPermissionRepository, private readonly validation: ValidationComposite<ICreatePermission>) {
    this.permissionRepository = permissionRepository
    this.validation = validation
  }

  async update (requestModel: IUpdatePermission): Promise<void> {
    await this.validation.validate(requestModel)

    await this.checkPermissionExists(requestModel.name)

    await this.permissionRepository.update(requestModel)
  }

  private async checkPermissionExists (name: string) {
    const permission = await this.permissionRepository.findByName(name)

    if (permission) { throw new DataAlreadyExistsError('Permission already exists') }
  }
}
