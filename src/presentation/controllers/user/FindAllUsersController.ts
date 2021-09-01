import { IUser } from '@domain/models/IUser'
import { IFindAllUsersUseCase } from '@domain/useCases/user/IFindAllUsersUseCase'
import { TGenericFilterRequest } from '@application/protocols/requests/GenericFilterRequest'
import { Controller } from '@application/protocols/controllers/Controller'
import { HttpResponse, HttpResponseHandler } from '@application/protocols/requests/Http'

export class FindAllUsersController implements Controller {
  constructor (private readonly user: IFindAllUsersUseCase, private readonly presenter: HttpResponseHandler<IUser[]>) {
    this.user = user
    this.presenter = presenter
  }

  async handle (request: TGenericFilterRequest): Promise<HttpResponse<IUser[]>> {
    const { order, limit, offset } = request.query

    const user = await this.user.findAll({ order, limit, offset })

    return await this.presenter.response(user)
  }
}
