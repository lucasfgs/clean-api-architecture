import { IUser } from '@domain/models/IUser'
import { IUserRepository } from '@domain/repositories/IUserRepository'
import { IFindAllUsersUseCase } from '@domain/useCases/user/IFindAllUsersUseCase'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'
import { IGenericFilterRequestQuery, TOrder } from '@application/protocols/requests/GenericFilterRequest'

export class FindAllUsersUseCase implements IFindAllUsersUseCase {
  constructor (private readonly repository: IUserRepository, private readonly validation: ValidationComposite<IGenericFilterRequestQuery>) {
    this.repository = repository
    this.validation = validation
  }

  async findAll (request: IGenericFilterRequestQuery): Promise<IUser[]> {
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
