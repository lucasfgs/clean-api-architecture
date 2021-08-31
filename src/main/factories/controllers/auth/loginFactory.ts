import { LoginUseCase } from '@application/useCases/auth/LoginUseCase'
import { jwtAdapterSingleton } from '@main/adapters/security/JwtAdapter'
import { BCryptAdapter } from '@main/adapters/security/BCryptAdapter'
import { UserRepository } from '@application/repositories/UserRepository'
import { LoginController } from '@presentation/controllers/auth/LoginController'
import { GenericSuccessResponse } from '@presentation/responses/GenericSuccessResponse'
import { IUserLoginResponse } from '@domain/models/IUser'

export const loginFactory = () => {
  const userRepository = new UserRepository()

  const passwordHashing = new BCryptAdapter()
  const loginUseCase = new LoginUseCase(userRepository, passwordHashing, jwtAdapterSingleton)

  const loginPresenter = new GenericSuccessResponse<IUserLoginResponse>()
  const loginController = new LoginController(loginUseCase, loginPresenter)

  return {
    userRepository,
    loginUseCase,
    loginPresenter,
    loginController
  }
}
