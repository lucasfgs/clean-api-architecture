import { IUserLoginRequest, IUserLoginResponse } from '@domain/models/IUser'
import { ILoginUseCase } from '@domain/useCases/auth/ILoginUseCase'
import { Controller } from '@application/protocols/controllers/Controller'
import { HttpRequest, HttpResponse, HttpResponseHandler } from '@application/protocols/requests/Http'
import { objectKeyExists } from '@application/helpers/objects/objectKeyExists'
import { RequestValidationError } from '@application/errors/RequestValidationError'

export class LoginController implements Controller {
  constructor (private readonly auth: ILoginUseCase, private readonly presenter: HttpResponseHandler<IUserLoginResponse>) {
    this.auth = auth
    this.presenter = presenter
  }

  async handle (request: HttpRequest<IUserLoginRequest>): Promise<HttpResponse<IUserLoginResponse>> {
    this.validateRequest(request)

    const { email, password } = request.body

    const auth = await this.auth.login({
      email, password
    })

    return await this.presenter.response(auth)
  }

  private validateRequest (request:HttpRequest<IUserLoginRequest>) {
    if (
      !objectKeyExists(request, 'body') ||
      !objectKeyExists(request.body, 'email') ||
      !objectKeyExists(request.body, 'password')
    ) {
      throw new RequestValidationError('Invalid request')
    }
  }
}
