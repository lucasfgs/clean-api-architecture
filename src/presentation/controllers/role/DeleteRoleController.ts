import { IDeleteRoleUseCase } from '@domain/useCases/role/IDeleteRoleUseCase'
import { TGenericRequestParam } from '@presentation/requests/GenericRequestParam'
import { Controller } from '../../protocols/Controller'
import { HttpResponse, HttpResponseHandler } from '../../protocols/Http'

export class DeleteRoleController implements Controller {
  constructor (private readonly role: IDeleteRoleUseCase, private readonly presenter: HttpResponseHandler<void>) {
    this.role = role
    this.presenter = presenter
  }

  async handle (request: TGenericRequestParam<any>): Promise<HttpResponse<void>> {
    const { id } = request.params

    const permission = await this.role.delete(id)

    return await this.presenter.response(permission)
  }
}
