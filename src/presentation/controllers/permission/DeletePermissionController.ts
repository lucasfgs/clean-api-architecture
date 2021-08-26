import { IPermissionParams } from '@domain/models/IPermission'
import { IDeletePermissionUseCase } from '@domain/useCases/permission/IDeletePermissionUseCase'
import { Controller } from '../../protocols/Controller'
import { HttpRequest, HttpResponse, HttpResponseHandler } from '../../protocols/Http'

type RequestType = HttpRequest<IPermissionParams>

export class DeletePermissionController implements Controller {
  constructor (private readonly permission: IDeletePermissionUseCase, private readonly presenter: HttpResponseHandler<void>) {
    this.permission = permission
    this.presenter = presenter
  }

  async handle (request: RequestType): Promise<HttpResponse<void>> {
    const { id } = request.params

    const permission = await this.permission.delete(id)

    return await this.presenter.response(permission)
  }
}
