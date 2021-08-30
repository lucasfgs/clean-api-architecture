import { IPermissionRole } from '@domain/models/IPermissionRole'
import { IPermissionRoleRepository } from '@domain/repositories/IPermissionRoleRepository'
import { IFindAllPermissionRolesUseCase } from '@domain/useCases/permissionRole/IFindAllPermissionRolesUseCase'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'
import { IGenericFilterRequestQuery, TOrder } from '@application/protocols/requests/GenericFilterRequest'

export class FindAllPermissionRolesUseCase implements IFindAllPermissionRolesUseCase {
  constructor (private readonly repository: IPermissionRoleRepository, private readonly validation: ValidationComposite<IGenericFilterRequestQuery>) {
    this.repository = repository
    this.validation = validation
  }

  async findAll (request: IGenericFilterRequestQuery): Promise<IPermissionRole[]> {
    let order: TOrder = 'ASC'
    let limit = 100
    let offset = 0
    if (request) {
      if (request.order) order = request.order.toUpperCase() as TOrder
      if (request.limit) limit = request.limit
      if (request.offset) offset = request.offset
    }

    this.validation.validate(request)

    return await this.repository.findAll(order, limit, offset)
  }
}
