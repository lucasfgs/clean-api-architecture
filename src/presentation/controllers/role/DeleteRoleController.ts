import { IDeleteRoleUseCase } from '@domain/useCases/role/IDeleteRoleUseCase'
import { TGenericRequestParam } from '@application/protocols/requests/GenericRequestParam'
import { Controller } from '../../../application/protocols/controllers/Controller'
import { HttpResponse, HttpResponseHandler } from '../../../application/protocols/requests/Http'

export class DeleteRoleController implements Controller {
  constructor (private readonly role: IDeleteRoleUseCase, private readonly presenter: HttpResponseHandler<void>) {
    this.role = role
    this.presenter = presenter
  }

  async handle (request: TGenericRequestParam<any>): Promise<HttpResponse<void>> {
    const { id } = request.params

    const role = await this.role.delete(id)

    return await this.presenter.response(role)
  }
}
