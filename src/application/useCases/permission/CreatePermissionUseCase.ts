import { IPermission } from '../../../data/models/IPermission'
import { IPermissionRepository } from '../../../data/repositories/IPermissionRepository'
import { ICreatePermissionUseCase, TCreatePermissionRequestModel } from '../../../domain/useCases/permission/ICreatePermissionUseCase'

export class CreatePermissionUseCase implements ICreatePermissionUseCase {
  constructor (private readonly createPermissionRepository: IPermissionRepository) {
    this.createPermissionRepository = createPermissionRepository
  }

  async create (requestModel: TCreatePermissionRequestModel): Promise<IPermission> {
    const permission = await this.createPermissionRepository.create(requestModel)

    return permission
  }
}
