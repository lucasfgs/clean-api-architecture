/* eslint-disable camelcase */
import { IPermission } from '@domain/models/IPermission'
import { IUpdatePermissionRole } from '@domain/models/IPermissionRole'
import { IRole } from '@domain/models/IRole'
import { IUpdatePermissionRoleUseCase } from '@domain/useCases/permissionRole/IUpdatePermissionRoleUseCase'
import { TGenericRequestParam } from '@application/protocols/requests/GenericRequestParam'
import { Controller } from '@application/protocols/controllers/Controller'
import { HttpResponse, HttpResponseHandler } from '@application/protocols/requests/Http'
import { objectKeyExists } from '@application/helpers/objects/objectKeyExists'
import { RequestValidationError } from '@application/errors/RequestValidationError'

type RequestType = TGenericRequestParam<IUpdatePermissionRole, {permission_id: IPermission, role_id: IRole}>

export class UpdatePermissionRoleController implements Controller {
  constructor (private readonly permissionRole: IUpdatePermissionRoleUseCase, private readonly presenter: HttpResponseHandler<void>) {
    this.permissionRole = permissionRole
    this.presenter = presenter
  }

  async handle (request: RequestType): Promise<HttpResponse<void>> {
    this.validateRequest(request)

    const { permission_id, role_id } = request.params
    const { create, delete: destroy, read, update } = request.body

    const permissionRole = await this.permissionRole.update(
      {
        create,
        delete: destroy,
        read,
        update,
        permission: permission_id,
        role: role_id
      }
    )

    return await this.presenter.response(permissionRole)
  }

  private validateRequest (request: RequestType) {
    if (
      !objectKeyExists(request, 'params') ||
      !objectKeyExists(request, 'body') ||
      !objectKeyExists(request.params, 'permission_id') ||
      !objectKeyExists(request.params, 'role_id') ||
      !objectKeyExists(request.body, 'create') ||
      !objectKeyExists(request.body, 'delete') ||
      !objectKeyExists(request.body, 'read') ||
      !objectKeyExists(request.body, 'update')
    ) {
      throw new RequestValidationError('Invalid request')
    }
  }
}
