import { IPermission } from '@domain/models/IPermission'
import { IPermissionRepository } from '@domain/repositories/IPermissionRepository'
import { IFindAllPermissionsRequestModel, IFindAllPermissionsUseCase } from '@domain/useCases/permission/IFindAllPermissionsUseCase'
import { ValidationComposite } from '@presentation/protocols/ValidationComposite'

export class FindAllPermissionsUseCase implements IFindAllPermissionsUseCase {
  constructor (private readonly permissionRepository: IPermissionRepository, private readonly validation: ValidationComposite<IFindAllPermissionsRequestModel>) {
    this.permissionRepository = permissionRepository
    this.validation = validation
  }

  async findAll (request: IFindAllPermissionsRequestModel): Promise<IPermission[]> {
    let order: 'DESC' | 'ASC' = 'DESC'
    let limit = 100
    let offset = 0
    if (request) {
      if (request.order) order = request.order
      if (request.limit) limit = request.limit
      if (request.offset) offset = request.offset
    }

    this.validation.validate({ order, limit, offset })

    const permissions = await this.permissionRepository.findAll(order, limit, offset)
    return permissions
  }
}
