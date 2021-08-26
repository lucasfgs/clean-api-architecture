/* eslint-disable camelcase */
import { IDeletePermissionRoleUseCase } from '@domain/useCases/permissionRole/IDeletePermissionRoleUseCase'
import { Controller } from '../../protocols/Controller'
import { HttpRequest, HttpResponse, HttpResponseHandler } from '../../protocols/Http'

type RequestType = HttpRequest<any, {permission_id: number, role_id: number}>

export class DeletePermissionRoleController implements Controller {
  constructor (private readonly role: IDeletePermissionRoleUseCase, private readonly presenter: HttpResponseHandler<void>) {
    this.role = role
    this.presenter = presenter
  }

  async handle (request: RequestType): Promise<HttpResponse<void>> {
    const { permission_id, role_id } = request.params

    const permission = await this.role.delete(permission_id, role_id)

    return await this.presenter.response(permission)
  }
}
