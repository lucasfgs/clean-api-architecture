/* eslint-disable camelcase */
import { IPermission } from '@domain/models/IPermission'
import { IUpdatePermissionRole } from '@domain/models/IPermissionRole'
import { IRole } from '@domain/models/IRole'
import { IUpdatePermissionRoleUseCase } from '@domain/useCases/permissionRole/IUpdatePermissionRoleUseCase'
import { TGenericRequestParam } from '@presentation/requests/GenericRequestParam'
import { Controller } from '../../protocols/Controller'
import { HttpResponse, HttpResponseHandler } from '../../protocols/Http'

export class UpdatePermissionRoleController implements Controller {
  constructor (private readonly permissionRole: IUpdatePermissionRoleUseCase, private readonly presenter: HttpResponseHandler<void>) {
    this.permissionRole = permissionRole
    this.presenter = presenter
  }

  async handle (request: TGenericRequestParam<IUpdatePermissionRole, {permission_id: IPermission, role_id: IRole}>): Promise<HttpResponse<void>> {
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
}
