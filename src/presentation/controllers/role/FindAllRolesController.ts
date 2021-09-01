import { IRole } from '@domain/models/IRole'
import { IFindAllRolesUseCase } from '@domain/useCases/role/IFindAllRolesUseCase'
import { TGenericFilterRequest } from '@application/protocols/requests/GenericFilterRequest'
import { Controller } from '@application/protocols/controllers/Controller'
import { HttpResponse, HttpResponseHandler } from '@application/protocols/requests/Http'

export class FindAllRolesController implements Controller {
  constructor (private readonly role: IFindAllRolesUseCase, private readonly presenter: HttpResponseHandler<IRole[]>) {
    this.role = role
    this.presenter = presenter
  }

  async handle (request: TGenericFilterRequest): Promise<HttpResponse<IRole[]>> {
    const { order, limit, offset } = request.query

    const roles = await this.role.findAll({ order, limit, offset })

    return await this.presenter.response(roles)
  }
}
