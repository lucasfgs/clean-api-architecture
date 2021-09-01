import { objectKeyExists } from '@application/helpers/objects/objectKeyExists'
import { IPermission } from '@domain/models/IPermission'
import { ICreatePermissionUseCase } from '@domain/useCases/permission/ICreatePermissionUseCase'
import { RequestValidationError } from '@application/errors/RequestValidationError'
import { Controller } from '@application/protocols/controllers/Controller'
import { HttpRequest, HttpResponse, HttpResponseHandler } from '@application/protocols/requests/Http'

export class CreatePermissionController implements Controller {
  constructor (private readonly permission: ICreatePermissionUseCase, private readonly presenter: HttpResponseHandler<IPermission>) {
    this.permission = permission
    this.presenter = presenter
  }

  async handle (request: HttpRequest<IPermission>): Promise<HttpResponse<IPermission>> {
    this.validateRequest(request)

    const { name } = request.body

    const permission = await this.permission.create({
      name
    })

    return await this.presenter.response(permission)
  }

  private validateRequest (request:HttpRequest<IPermission>) {
    if (
      !objectKeyExists(request, 'body') ||
      !objectKeyExists(request.body, 'name')
    ) {
      throw new RequestValidationError('Invalid request')
    }
  }
}
