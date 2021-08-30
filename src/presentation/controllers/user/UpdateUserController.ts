import { IUpdateUser } from '@domain/models/IUser'
import { IUpdateUserUseCase } from '@domain/useCases/user/IUpdateUserUseCase'
import { TGenericRequestParam } from '@application/protocols/requests/GenericRequestParam'
import { Controller } from '../../../application/protocols/controllers/Controller'
import { HttpResponse, HttpResponseHandler } from '../../../application/protocols/requests/Http'

export class UpdateUserController implements Controller {
  constructor (private readonly user: IUpdateUserUseCase, private readonly presenter: HttpResponseHandler<void>) {
    this.user = user
    this.presenter = presenter
  }

  async handle (request: TGenericRequestParam<IUpdateUser>): Promise<HttpResponse<void>> {
    const { id } = request.params
    const { name, email, password, role } = request.body

    const user = await this.user.update({ id, name, email, password, role })

    return await this.presenter.response(user)
  }
}
