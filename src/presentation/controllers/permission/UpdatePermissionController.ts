import { IPermissionParams, IUpdatePermission } from '@domain/models/IPermission'
import { IUpdatePermissionUseCase } from '@domain/useCases/permission/IUpdatePermissionUseCase'
import { Controller } from '../../protocols/Controller'
import { HttpRequest, HttpResponse, HttpResponseHandler } from '../../protocols/Http'

type RequestType = HttpRequest<IUpdatePermission, IPermissionParams>

export class UpdatePermissionController implements Controller {
  constructor (private readonly permission: IUpdatePermissionUseCase, private readonly presenter: HttpResponseHandler<void>) {
    this.permission = permission
    this.presenter = presenter
  }

  async handle (request: RequestType): Promise<HttpResponse<void>> {
    const { id } = request.params
    const { name } = request.body

    const permission = await this.permission.update({
      id,
      name
    })

    return await this.presenter.response(permission)
  }
}
