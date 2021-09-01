import { IUpdatePermission } from '@domain/models/IPermission'
import { IUpdatePermissionUseCase } from '@domain/useCases/permission/IUpdatePermissionUseCase'
import { TGenericRequestParam } from '@application/protocols/requests/GenericRequestParam'
import { Controller } from '@application/protocols/controllers/Controller'
import { HttpResponse, HttpResponseHandler } from '@application/protocols/requests/Http'
import { objectKeyExists } from '@application/helpers/objects/objectKeyExists'
import { RequestValidationError } from '@application/errors/RequestValidationError'

export class UpdatePermissionController implements Controller {
  constructor (private readonly permission: IUpdatePermissionUseCase, private readonly presenter: HttpResponseHandler<void>) {
    this.permission = permission
    this.presenter = presenter
  }

  async handle (request: TGenericRequestParam<IUpdatePermission>): Promise<HttpResponse<void>> {
    this.validateRequest(request)

    const { id } = request.params
    const { name } = request.body

    const permission = await this.permission.update({
      id,
      name
    })

    return await this.presenter.response(permission)
  }

  private validateRequest (request: TGenericRequestParam<IUpdatePermission>) {
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
