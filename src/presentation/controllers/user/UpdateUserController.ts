import { IUpdateUser } from '@domain/models/IUser'
import { IUpdateUserUseCase } from '@domain/useCases/user/IUpdateUserUseCase'
import { TGenericRequestParam } from '@application/protocols/requests/GenericRequestParam'
import { Controller } from '@application/protocols/controllers/Controller'
import { HttpResponse, HttpResponseHandler } from '@application/protocols/requests/Http'
import { objectKeyExists } from '@application/helpers/objects/objectKeyExists'
import { RequestValidationError } from '@application/errors/RequestValidationError'

export class UpdateUserController implements Controller {
  constructor (private readonly user: IUpdateUserUseCase, private readonly presenter: HttpResponseHandler<void>) {
    this.user = user
    this.presenter = presenter
  }

  async handle (request: TGenericRequestParam<IUpdateUser>): Promise<HttpResponse<void>> {
    this.validateRequest(request)

    const { id } = request.params
    const { name, email, password, role } = request.body

    const user = await this.user.update({ id, name, email, password, role })

    return await this.presenter.response(user)
  }

  private validateRequest (request: TGenericRequestParam<IUpdateUser>) {
    if (
      !objectKeyExists(request, 'params') ||
      !objectKeyExists(request, 'body') ||
      !objectKeyExists(request.params, 'id') ||
      !objectKeyExists(request.body, 'name') ||
      !objectKeyExists(request.body, 'email') ||
      !objectKeyExists(request.body, 'password') ||
      !objectKeyExists(request.body, 'role')
    ) {
      throw new RequestValidationError('Invalid request')
    }
  }
}
