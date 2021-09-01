import { IDeleteUserUseCase } from '@domain/useCases/user/IDeleteUserUseCase'
import { TGenericRequestParam } from '@application/protocols/requests/GenericRequestParam'
import { Controller } from '@application/protocols/controllers/Controller'
import { HttpResponse, HttpResponseHandler } from '@application/protocols/requests/Http'
import { objectKeyExists } from '@application/helpers/objects/objectKeyExists'
import { RequestValidationError } from '@application/errors/RequestValidationError'

export class DeleteUserController implements Controller {
  constructor (private readonly user: IDeleteUserUseCase, private readonly presenter: HttpResponseHandler<void>) {
    this.user = user
    this.presenter = presenter
  }

  async handle (request: TGenericRequestParam<any>): Promise<HttpResponse<void>> {
    this.validateRequest(request)

    const { id } = request.params

    const permission = await this.user.delete(id)

    return await this.presenter.response(permission)
  }

  private validateRequest (request: TGenericRequestParam<any>) {
    if (
      !objectKeyExists(request, 'params') ||
      !objectKeyExists(request.params, 'id')
    ) {
      throw new RequestValidationError('Invalid request')
    }
  }
}
