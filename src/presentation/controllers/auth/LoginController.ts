import { IUserLoginRequest, IUserLoginResponse } from '@domain/models/IUser'
import { ILoginUseCase } from '@domain/useCases/auth/ILoginUseCase'
import { Controller } from '@application/protocols/controllers/Controller'
import { HttpRequest, HttpResponse, HttpResponseHandler } from '@application/protocols/requests/Http'

export class LoginController implements Controller {
  constructor (private readonly auth: ILoginUseCase, private readonly presenter: HttpResponseHandler<IUserLoginResponse>) {
    this.auth = auth
    this.presenter = presenter
  }

  async handle (request: HttpRequest<IUserLoginRequest>): Promise<HttpResponse<IUserLoginResponse>> {
    const { email, password } = request.body

    const auth = await this.auth.login({
      email, password
    })

    return await this.presenter.response(auth)
  }
}
