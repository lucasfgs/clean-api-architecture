import { ICreatePermission, IPermission } from '@domain/models/IPermission'
import { IPermissionRepository } from '@domain/repositories/IPermissionRepository'
import { ICreatePermissionUseCase } from '@domain/useCases/permission/ICreatePermissionUseCase'
import { DataAlreadyExistsError } from '@presentation/errors/DataAlreadyExistsError'
import { ValidationComposite } from '@presentation/protocols/ValidationComposite'

export class CreatePermissionUseCase implements ICreatePermissionUseCase {
  constructor (private readonly permissionRepository: IPermissionRepository, private readonly validation: ValidationComposite<ICreatePermission>) {
    this.permissionRepository = permissionRepository
    this.validation = validation
  }

  async create (requestModel: ICreatePermission): Promise<IPermission> {
    await this.validation.validate(requestModel)
    const permission = await this.permissionRepository.findByName(requestModel.name)

    if (permission) { throw new DataAlreadyExistsError('Permission already exists') }

    return await this.permissionRepository.create(requestModel)
  }
}
