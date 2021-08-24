import { DefaultApplicationError } from '../../../presentation/errors/DefaultApplicationError'
import { ICreatePermission, IPermission } from '../../../data/models/IPermission'
import { IPermissionRepository } from '../../../data/repositories/IPermissionRepository'
import { ICreatePermissionUseCase } from '../../../domain/useCases/permission/ICreatePermissionUseCase'

export class CreatePermissionUseCase implements ICreatePermissionUseCase {
  constructor (private readonly permissionRepository: IPermissionRepository) {
    this.permissionRepository = permissionRepository
  }

  async create (requestModel: ICreatePermission): Promise<IPermission> {
    const permission = await this.permissionRepository.findByName(requestModel.name)

    if (permission) { throw new DefaultApplicationError('Permission already exists') }

    return await this.permissionRepository.create(requestModel)
  }
}
