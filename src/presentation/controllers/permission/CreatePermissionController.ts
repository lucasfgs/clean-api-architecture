import { IPermission } from '@domain/models/IPermission'
import { ICreatePermissionUseCase } from '@domain/useCases/permission/ICreatePermissionUseCase'
import { Controller } from '../../protocols/Controller'
import { HttpRequest, HttpResponse, HttpResponseHandler } from '../../protocols/Http'

export class CreatePermissionController implements Controller {
  constructor (private readonly permission: ICreatePermissionUseCase, private readonly presenter: HttpResponseHandler<IPermission>) {
    this.permission = permission
    this.presenter = presenter
  }

  async handle (request: HttpRequest<IPermission>): Promise<HttpResponse<IPermission>> {
    const { name } = request.body

    const permission = await this.permission.create({
      name
    })

    return await this.presenter.response(permission)
  }
}
