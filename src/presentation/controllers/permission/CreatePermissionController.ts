import { CreatePermissionUseCase } from '../../../application/useCases/permission/CreatePermissionUseCase'
import { IPermission } from '../../../data/models/IPermission'
import { Controller } from '../../protocols/Controller'
import { HttpRequest, HttpResponse, HttpResponseHandler } from '../../protocols/Http'

export class CreatePermissionController implements Controller {
  constructor (private readonly createPermission: CreatePermissionUseCase, private readonly presenter: HttpResponseHandler<IPermission>) {
    this.createPermission = createPermission
    this.presenter = presenter
  }

  async handle (request: HttpRequest<IPermission>): Promise<HttpResponse<IPermission>> {
    const { name } = request.body

    const permission = await this.createPermission.create({
      name
    })

    return await this.presenter.response(permission)
  }
}
