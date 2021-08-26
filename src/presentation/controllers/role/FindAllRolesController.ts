import { IRole } from '@domain/models/IRole'
import { IFindAllRolesUseCase } from '@domain/useCases/role/IFindAllRolesUseCase'
import { TGenericFilterRequest } from '@presentation/requests/GenericFilterRequest'
import { Controller } from '../../protocols/Controller'
import { HttpResponse, HttpResponseHandler } from '../../protocols/Http'

export class FindAllRolesController implements Controller {
  constructor (private readonly role: IFindAllRolesUseCase, private readonly presenter: HttpResponseHandler<IRole[]>) {
    this.role = role
    this.presenter = presenter
  }

  async handle (request: TGenericFilterRequest): Promise<HttpResponse<IRole[]>> {
    const { order, limit, offset } = request.query

    const permission = await this.role.findAll({ order, limit, offset })

    return await this.presenter.response(permission)
  }
}
