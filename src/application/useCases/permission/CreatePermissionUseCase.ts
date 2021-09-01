import { ICreatePermission, IPermission } from '@domain/models/IPermission'
import { IPermissionRepository } from '@domain/repositories/IPermissionRepository'
import { ICreatePermissionUseCase } from '@domain/useCases/permission/ICreatePermissionUseCase'
import { DataAlreadyExistsError } from '@application/errors/DataAlreadyExistsError'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'

export class CreatePermissionUseCase implements ICreatePermissionUseCase {
  constructor (private readonly permissionRepository: IPermissionRepository, private readonly validation: ValidationComposite<ICreatePermission>) {
    this.permissionRepository = permissionRepository
    this.validation = validation
  }

  async create (requestModel?: ICreatePermission): Promise<IPermission> {
    await this.validation.validate(requestModel)

    await this.checkPermissionExists(requestModel.name)

    return await this.permissionRepository.create(requestModel)
  }

  private async checkPermissionExists (name: string) {
    const permission = await this.permissionRepository.findByName(name)

    if (permission) { throw new DataAlreadyExistsError('Permission already exists') }
  }
}
