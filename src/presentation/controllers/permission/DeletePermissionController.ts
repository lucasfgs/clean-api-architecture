import { IDeletePermissionUseCase } from '@domain/useCases/permission/IDeletePermissionUseCase'
import { TGenericRequestParam } from '@application/protocols/requests/GenericRequestParam'
import { Controller } from '@application/protocols/controllers/Controller'
import { HttpResponse, HttpResponseHandler } from '@application/protocols/requests/Http'
import { objectKeyExists } from '@application/helpers/objects/objectKeyExists'
import { RequestValidationError } from '@application/errors/RequestValidationError'

export class DeletePermissionController implements Controller {
  constructor (private readonly permission: IDeletePermissionUseCase, private readonly presenter: HttpResponseHandler<void>) {
    this.permission = permission
    this.presenter = presenter
  }

  async handle (request: TGenericRequestParam<any>): Promise<HttpResponse<void>> {
    this.validateRequest(request)

    const { id } = request.params

    const permission = await this.permission.delete(id)

    return await this.presenter.response(permission)
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
