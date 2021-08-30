import { IUpdateRole } from '@domain/models/IRole'
import { IUpdateRoleUseCase } from '@domain/useCases/role/IUpdateRoleUseCase'
import { TGenericRequestParam } from '@application/protocols/requests/GenericRequestParam'
import { Controller } from '../../../application/protocols/controllers/Controller'
import { HttpResponse, HttpResponseHandler } from '../../../application/protocols/requests/Http'

export class UpdateRoleController implements Controller {
  constructor (private readonly role: IUpdateRoleUseCase, private readonly presenter: HttpResponseHandler<void>) {
    this.role = role
    this.presenter = presenter
  }

  async handle (request: TGenericRequestParam<IUpdateRole>): Promise<HttpResponse<void>> {
    const { id } = request.params
    const { name } = request.body

    const role = await this.role.update({ id, name })

    return await this.presenter.response(role)
  }
}
