import { IPermissionRole } from '@domain/models/IPermissionRole'
import { ICreatePermissionRoleUseCase } from '@domain/useCases/permissionRole/ICreatePermissionRoleUseCase'
import { Controller } from '../../protocols/Controller'
import { HttpRequest, HttpResponse, HttpResponseHandler } from '../../protocols/Http'

export class CreatePermissionRoleController implements Controller {
  constructor (private readonly permissionRole: ICreatePermissionRoleUseCase, private readonly presenter: HttpResponseHandler<IPermissionRole>) {
    this.permissionRole = permissionRole
    this.presenter = presenter
  }

  async handle (request: HttpRequest<IPermissionRole>): Promise<HttpResponse<IPermissionRole>> {
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
}
