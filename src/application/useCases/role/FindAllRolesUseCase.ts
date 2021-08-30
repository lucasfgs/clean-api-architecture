import { IRole } from '@domain/models/IRole'
import { IRoleRepository } from '@domain/repositories/IRoleRepository'
import { IFindAllRolesUseCase } from '@domain/useCases/role/IFindAllRolesUseCase'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'
import { IGenericFilterRequestQuery, TOrder } from '@application/protocols/requests/GenericFilterRequest'

export class FindAllRolesUseCase implements IFindAllRolesUseCase {
  constructor (private readonly repository: IRoleRepository, private readonly validation: ValidationComposite<IGenericFilterRequestQuery>) {
    this.repository = repository
    this.validation = validation
  }

  async findAll (request: IGenericFilterRequestQuery): Promise<IRole[]> {
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
