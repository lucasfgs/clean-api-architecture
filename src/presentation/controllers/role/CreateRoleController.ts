import { objectKeyExists } from '@application/helpers/objects/objectKeyExists'
import { IRole } from '@domain/models/IRole'
import { ICreateRoleUseCase } from '@domain/useCases/role/ICreateRoleUseCase'
import { RequestValidationError } from '@application/errors/RequestValidationError'
import { Controller } from '@application/protocols/controllers/Controller'
import { HttpRequest, HttpResponse, HttpResponseHandler } from '@application/protocols/requests/Http'

export class CreateRoleController implements Controller {
  constructor (private readonly role: ICreateRoleUseCase, private readonly presenter: HttpResponseHandler<IRole>) {
    this.role = role
    this.presenter = presenter
  }

  async handle (request: HttpRequest<IRole>): Promise<HttpResponse<IRole>> {
    this.validateRequest(request)

    const { name } = request.body

    const role = await this.role.create({
      name
    })

    return await this.presenter.response(role)
  }

  private validateRequest (request: HttpRequest<IRole>) {
    if (
      !objectKeyExists(request, 'body') ||
      !objectKeyExists(request.body, 'name')
    ) {
      throw new RequestValidationError('Invalid request')
    }
  }
}
