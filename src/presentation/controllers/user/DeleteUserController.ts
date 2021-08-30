import { IDeleteUserUseCase } from '@domain/useCases/user/IDeleteUserUseCase'
import { TGenericRequestParam } from '@presentation/requests/GenericRequestParam'
import { Controller } from '../../protocols/Controller'
import { HttpResponse, HttpResponseHandler } from '../../protocols/Http'

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
