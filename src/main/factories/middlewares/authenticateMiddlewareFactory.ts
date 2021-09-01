import { UserRepository } from '@application/repositories/UserRepository'
import { jwtAdapterSingleton } from '@main/adapters/security/JwtAdapter'
import { Authenticate } from '@presentation/middlewares/auth/Authenticate'

export const authenticateMiddlewareFactory = () => {
  const jwtAdapter = jwtAdapterSingleton

  const userRepository = new UserRepository()

  const authenticate = new Authenticate(jwtAdapter, userRepository)

  return {
    jwtAdapter,
    userRepository,
    authenticate
  }
}
