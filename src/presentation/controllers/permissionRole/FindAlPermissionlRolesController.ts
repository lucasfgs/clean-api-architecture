import { IPermissionRole } from '@domain/models/IPermissionRole'
import { IFindAllPermissionRolesUseCase } from '@domain/useCases/permissionRole/IFindAllPermissionRolesUseCase'
import { TGenericFilterRequest } from '@application/protocols/requests/GenericFilterRequest'
import { Controller } from '@application/protocols/controllers/Controller'
import { HttpResponse, HttpResponseHandler } from '@application/protocols/requests/Http'

export class FindAllPermissionRolesController implements Controller {
  constructor (private readonly permissionRole: IFindAllPermissionRolesUseCase, private readonly presenter: HttpResponseHandler<IPermissionRole[]>) {
    this.permissionRole = permissionRole
    this.presenter = presenter
  }

  async handle (request: TGenericFilterRequest): Promise<HttpResponse<IPermissionRole[]>> {
    const { order, limit, offset } = request.query

    const permission = await this.permissionRole.findAll({ order, limit, offset })

    return await this.presenter.response(permission)
  }
}
