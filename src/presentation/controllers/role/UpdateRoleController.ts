import { IUpdateRole } from '@domain/models/IRole'
import { IUpdateRoleUseCase } from '@domain/useCases/role/IUpdateRoleUseCase'
import { TGenericRequestParam } from '@application/protocols/requests/GenericRequestParam'
import { Controller } from '@application/protocols/controllers/Controller'
import { HttpResponse, HttpResponseHandler } from '@application/protocols/requests/Http'
import { objectKeyExists } from '@application/helpers/objects/objectKeyExists'
import { RequestValidationError } from '@application/errors/RequestValidationError'

export class UpdateRoleController implements Controller {
  constructor (private readonly role: IUpdateRoleUseCase, private readonly presenter: HttpResponseHandler<void>) {
    this.role = role
    this.presenter = presenter
  }

  async handle (request: TGenericRequestParam<IUpdateRole>): Promise<HttpResponse<void>> {
    this.validateRequest(request)

    const { id } = request.params
    const { name } = request.body

    const role = await this.role.update({ id, name })

    return await this.presenter.response(role)
  }

  private validateRequest (request:TGenericRequestParam<any>) {
    if (
      !objectKeyExists(request, 'params') ||
      !objectKeyExists(request, 'body') ||
      !objectKeyExists(request.params, 'id') ||
      !objectKeyExists(request.body, 'name')
    ) {
      throw new RequestValidationError('Invalid request')
    }
  }
}
