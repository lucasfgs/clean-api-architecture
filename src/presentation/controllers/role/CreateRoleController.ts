import { IRole } from '@domain/models/IRole'
import { ICreateRoleUseCase } from '@domain/useCases/role/ICreateRoleUseCase'
import { Controller } from '../../protocols/Controller'
import { HttpRequest, HttpResponse, HttpResponseHandler } from '../../protocols/Http'

export class CreateRoleController implements Controller {
  constructor (private readonly role: ICreateRoleUseCase, private readonly presenter: HttpResponseHandler<IRole>) {
    this.role = role
    this.presenter = presenter
  }

  async handle (request: HttpRequest<IRole>): Promise<HttpResponse<IRole>> {
    const { name } = request.body

    const role = await this.role.create({
      name
    })

    return await this.presenter.response(role)
  }
}
