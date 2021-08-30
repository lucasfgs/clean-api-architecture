import { IUser } from '@domain/models/IUser'
import { ICreateUserUseCase } from '@domain/useCases/user/ICreateUserUseCase'
import { Controller } from '../../protocols/Controller'
import { HttpRequest, HttpResponse, HttpResponseHandler } from '../../protocols/Http'

export class CreateUserController implements Controller {
  constructor (private readonly user: ICreateUserUseCase, private readonly presenter: HttpResponseHandler<IUser>) {
    this.user = user
    this.presenter = presenter
  }

  async handle (request: HttpRequest<IUser>): Promise<HttpResponse<IUser>> {
    const { name, email, password, role } = request.body

    const user = await this.user.create({
      name,
      email,
      password,
      role
    })

    return await this.presenter.response(user)
  }
}
