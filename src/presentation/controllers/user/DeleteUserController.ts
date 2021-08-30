import { IDeleteUserUseCase } from '@domain/useCases/user/IDeleteUserUseCase'
import { TGenericRequestParam } from '@application/protocols/requests/GenericRequestParam'
import { Controller } from '../../../application/protocols/controllers/Controller'
import { HttpResponse, HttpResponseHandler } from '../../../application/protocols/requests/Http'

export class DeleteUserController implements Controller {
  constructor (private readonly user: IDeleteUserUseCase, private readonly presenter: HttpResponseHandler<void>) {
    this.user = user
    this.presenter = presenter
  }

  async handle (request: TGenericRequestParam<any>): Promise<HttpResponse<void>> {
    const { id } = request.params

    const permission = await this.user.delete(id)

    return await this.presenter.response(permission)
  }
}
