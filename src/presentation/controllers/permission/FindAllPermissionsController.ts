import { IPermission } from '@domain/models/IPermission'
import { IFindAllPermissionsUseCase } from '@domain/useCases/permission/IFindAllPermissionsUseCase'
import { IGenericFilterRequest } from '@presentation/requests/GenericFilterRequest'
import { Controller } from '../../protocols/Controller'
import { HttpResponse, HttpResponseHandler } from '../../protocols/Http'

export class FindAllPermissionsController implements Controller {
  constructor (private readonly permissionUseCase: IFindAllPermissionsUseCase, private readonly presenter: HttpResponseHandler<IPermission[]>) {
    this.permissionUseCase = permissionUseCase
    this.presenter = presenter
  }

  async handle (request: IGenericFilterRequest): Promise<HttpResponse<IPermission[]>> {
    const { order, limit, offset } = request.query

    const permission = await this.permissionUseCase.findAll({
      order,
      limit,
      offset
    })

    return await this.presenter.response(permission)
  }
}
