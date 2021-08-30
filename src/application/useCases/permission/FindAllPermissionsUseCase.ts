import { IPermission } from '@domain/models/IPermission'
import { IPermissionRepository } from '@domain/repositories/IPermissionRepository'
import { IFindAllPermissionsUseCase } from '@domain/useCases/permission/IFindAllPermissionsUseCase'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'
import { IGenericFilterRequestQuery, TOrder } from '@application/protocols/requests/GenericFilterRequest'

export class FindAllPermissionsUseCase implements IFindAllPermissionsUseCase {
  constructor (private readonly permissionRepository: IPermissionRepository, private readonly validation: ValidationComposite<IGenericFilterRequestQuery>) {
    this.permissionRepository = permissionRepository
    this.validation = validation
  }

  async findAll (request: IGenericFilterRequestQuery): Promise<IPermission[]> {
    let order: TOrder = 'DESC'
    let limit = 100
    let offset = 0
    if (request) {
      if (request.order) order = request.order.toUpperCase() as TOrder
      if (request.limit) limit = request.limit
      if (request.offset) offset = request.offset
    }

    this.validation.validate({ order, limit, offset })

    return await this.permissionRepository.findAll(order, limit, offset)
  }
}
