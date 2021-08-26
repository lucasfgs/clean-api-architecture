import { IUpdatePermissionRole } from '@domain/models/IPermissionRole'
import { IUpdatePermissionRoleUseCase } from '@domain/useCases/permissionRole/IUpdatePermissionRoleUseCase'
import { TGenericRequestParam } from '@presentation/requests/GenericRequestParam'
import { Controller } from '../../protocols/Controller'
import { HttpResponse, HttpResponseHandler } from '../../protocols/Http'

export class UpdatePermissionRoleController implements Controller {
  constructor (private readonly permissionRole: IUpdatePermissionRoleUseCase, private readonly presenter: HttpResponseHandler<void>) {
    this.permissionRole = permissionRole
    this.presenter = presenter
  }

  async handle (request: TGenericRequestParam<IUpdatePermissionRole>): Promise<HttpResponse<void>> {
    const { id } = request.params
    const { create, delete: destroy, read, update, permission, role } = request.body

    const permissionRole = await this.permissionRole.update(
      {
        id,
        create,
        delete: destroy,
        read,
        update,
        permission,
        role
      }
    )

    return await this.presenter.response(permissionRole)
  }
}
