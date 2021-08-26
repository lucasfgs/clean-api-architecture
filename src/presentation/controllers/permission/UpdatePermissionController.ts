import { IUpdatePermission } from '@domain/models/IPermission'
import { IUpdatePermissionUseCase } from '@domain/useCases/permission/IUpdatePermissionUseCase'
import { TGenericRequestParam } from '@presentation/requests/GenericRequestParam'
import { Controller } from '../../protocols/Controller'
import { HttpResponse, HttpResponseHandler } from '../../protocols/Http'

export class UpdatePermissionController implements Controller {
  constructor (private readonly permission: IUpdatePermissionUseCase, private readonly presenter: HttpResponseHandler<void>) {
    this.permission = permission
    this.presenter = presenter
  }

  async handle (request: TGenericRequestParam<IUpdatePermission>): Promise<HttpResponse<void>> {
    const { id } = request.params
    const { name } = request.body

    const permission = await this.permission.update({
      id,
      name
    })

    return await this.presenter.response(permission)
  }
}
