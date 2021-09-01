import { IDeleteRoleUseCase } from '@domain/useCases/role/IDeleteRoleUseCase'
import { TGenericRequestParam } from '@application/protocols/requests/GenericRequestParam'
import { Controller } from '@application/protocols/controllers/Controller'
import { HttpResponse, HttpResponseHandler } from '@application/protocols/requests/Http'
import { objectKeyExists } from '@application/helpers/objects/objectKeyExists'
import { RequestValidationError } from '@application/errors/RequestValidationError'

export class DeleteRoleController implements Controller {
  constructor (private readonly role: IDeleteRoleUseCase, private readonly presenter: HttpResponseHandler<void>) {
    this.role = role
    this.presenter = presenter
  }

  async handle (request: TGenericRequestParam<any>): Promise<HttpResponse<void>> {
    this.validateRequest(request)

    const { id } = request.params

    const role = await this.role.delete(id)

    return await this.presenter.response(role)
  }

  private validateRequest (request:TGenericRequestParam<any>) {
    if (
      !objectKeyExists(request, 'params') ||
      !objectKeyExists(request.params, 'id')
    ) {
      throw new RequestValidationError('Invalid request')
    }
  }
}
