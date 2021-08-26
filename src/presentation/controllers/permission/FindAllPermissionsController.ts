import { IPermission } from '@domain/models/IPermission'
import { IFindAllPermissionsUseCase } from '@domain/useCases/permission/IFindAllPermissionsUseCase'
import { TGenericFilterRequest } from '@presentation/requests/GenericFilterRequest'
import { Controller } from '../../protocols/Controller'
import { HttpResponse, HttpResponseHandler } from '../../protocols/Http'

export class FindAllPermissionsController implements Controller {
  constructor (private readonly permission: IFindAllPermissionsUseCase, private readonly presenter: HttpResponseHandler<IPermission[]>) {
    this.permission = permission
    this.presenter = presenter
  }

  async handle (request: TGenericFilterRequest): Promise<HttpResponse<IPermission[]>> {
    const { order, limit, offset } = request.query

    const permission = await this.permission.findAll({
      order,
      limit,
      offset
    })

    return await this.presenter.response(permission)
  }
}
