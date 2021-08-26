import { IDeletePermissionUseCase } from '@domain/useCases/permission/IDeletePermissionUseCase'
import { TGenericRequestParam } from '@presentation/requests/GenericRequestParam'
import { Controller } from '../../protocols/Controller'
import { HttpResponse, HttpResponseHandler } from '../../protocols/Http'

export class DeletePermissionController implements Controller {
  constructor (private readonly permission: IDeletePermissionUseCase, private readonly presenter: HttpResponseHandler<void>) {
    this.permission = permission
    this.presenter = presenter
  }

  async handle (request: TGenericRequestParam<any>): Promise<HttpResponse<void>> {
    const { id } = request.params

    const permission = await this.permission.delete(id)

    return await this.presenter.response(permission)
  }
}
