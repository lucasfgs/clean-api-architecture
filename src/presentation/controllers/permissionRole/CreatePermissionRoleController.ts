import { objectKeyExists } from '@application/helpers/objects/objectKeyExists'
import { IPermissionRole } from '@domain/models/IPermissionRole'
import { ICreatePermissionRoleUseCase } from '@domain/useCases/permissionRole/ICreatePermissionRoleUseCase'
import { RequestValidationError } from '@application/errors/RequestValidationError'
import { Controller } from '@application/protocols/controllers/Controller'
import { HttpRequest, HttpResponse, HttpResponseHandler } from '@application/protocols/requests/Http'

export class CreatePermissionRoleController implements Controller {
  constructor (private readonly permissionRole: ICreatePermissionRoleUseCase, private readonly presenter: HttpResponseHandler<IPermissionRole>) {
    this.permissionRole = permissionRole
    this.presenter = presenter
  }

  async handle (request: HttpRequest<IPermissionRole>): Promise<HttpResponse<IPermissionRole>> {
    this.validateRequest(request)

    const { create, delete: destroy, read, update, permission, role } = request.body

    const permissionRole = await this.permissionRole.create({
      create,
      delete: destroy,
      read,
      update,
      permission,
      role
    })

    return await this.presenter.response(permissionRole)
  }

  private validateRequest (request: HttpRequest<IPermissionRole>) {
    if (
      !objectKeyExists(request, 'body') ||
      !objectKeyExists(request.body, 'create') ||
      !objectKeyExists(request.body, 'read') ||
      !objectKeyExists(request.body, 'delete') ||
      !objectKeyExists(request.body, 'update') ||
      !objectKeyExists(request.body, 'permission') ||
      !objectKeyExists(request.body, 'role')
    ) {
      throw new RequestValidationError('Invalid request')
    }
  }
}
