/* eslint-disable camelcase */
import { objectKeyExists } from '@application/helpers/objects/objectKeyExists'
import { IDeletePermissionRoleUseCase } from '@domain/useCases/permissionRole/IDeletePermissionRoleUseCase'
import { RequestValidationError } from '@application/errors/RequestValidationError'
import { Controller } from '@application/protocols/controllers/Controller'
import { HttpRequest, HttpResponse, HttpResponseHandler } from '@application/protocols/requests/Http'

type RequestType = HttpRequest<any, {permission_id: number, role_id: number}>

export class DeletePermissionRoleController implements Controller {
  constructor (private readonly role: IDeletePermissionRoleUseCase, private readonly presenter: HttpResponseHandler<void>) {
    this.role = role
    this.presenter = presenter
  }

  async handle (request: RequestType): Promise<HttpResponse<void>> {
    this.validateRequest(request)

    const { permission_id, role_id } = request.params

    const permission = await this.role.delete(permission_id, role_id)

    return await this.presenter.response(permission)
  }

  private validateRequest (request: RequestType) {
    if (
      !objectKeyExists(request, 'params') ||
      !objectKeyExists(request.params, 'permission_id') ||
      !objectKeyExists(request.params, 'role_id')
    ) {
      throw new RequestValidationError('Invalid request')
    }
  }
}
