import { PasswordHashing } from '@application/protocols/security/PasswordHashing'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'
import { IUser, IUserLoginRequest, IUserLoginResponse } from '@domain/models/IUser'
import { IUserRepository } from '@domain/repositories/IUserRepository'
import { ILoginUseCase } from '@domain/useCases/auth/ILoginUseCase'
import { JwtAdapter } from '@main/adapters/security/JwtAdapter'
import { InternalServerError } from '@application/errors/InternalServerError'
import { NotFoundError } from '@application/errors/NotFoundError'
import { UnauthorizedError } from '@application/errors/UnauthorizedError'

export class LoginUseCase implements ILoginUseCase {
  constructor (
        private readonly userRepository: IUserRepository,
        private readonly passwordHashing: PasswordHashing,
        private readonly jwtAdapter: JwtAdapter,
        private readonly validation?: ValidationComposite<IUserLoginRequest>
  ) {
    this.userRepository = userRepository
    this.passwordHashing = passwordHashing
    this.jwtAdapter = jwtAdapter
    this.validation = validation
  }

  async login (requestModel: IUserLoginRequest): Promise<IUserLoginResponse> {
    await this.validate(requestModel)

    const user = await this.checkUserByEmail(requestModel.email)

    await this.checkPassword(user, requestModel)

    const token = this.jwtAdapter.sign({ id: user.id, role: user.role.name })

    return { token }
  }

  private async validate (requestModel: IUserLoginRequest) {
    if (this.validation) {
      await this.validation.validate(requestModel)
    }
  }

  private async checkUserByEmail (email): Promise<IUser> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) throw new NotFoundError('E-mail not found')

    return user
  }

  private async checkPassword (user:IUser, requestModel: IUserLoginRequest) {
    if (!user.password) {
      throw new InternalServerError('User has no password')
    }

    const isPasswordCorrect = await this.passwordHashing.compare(
      requestModel.password,
      user.password
    )

    if (!isPasswordCorrect) {
      throw new UnauthorizedError('Invalid credentials')
    }
  }
}
