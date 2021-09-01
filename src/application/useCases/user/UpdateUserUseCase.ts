import { IUpdateUser } from '@domain/models/IUser'
import { IRoleRepository } from '@domain/repositories/IRoleRepository'
import { IUserRepository } from '@domain/repositories/IUserRepository'
import { IUpdateUserUseCase } from '@domain/useCases/user/IUpdateUserUseCase'
import { NotFoundError } from '@application/errors/NotFoundError'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'
import { PasswordHashing } from '@application/protocols/security/PasswordHashing'

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor (
    private readonly repository: IUserRepository,
    private readonly roleRepository: IRoleRepository,
    private readonly passwordHashing: PasswordHashing,
    private readonly validation: ValidationComposite<IUpdateUser>) {
    this.repository = repository
    this.roleRepository = roleRepository
    this.passwordHashing = passwordHashing
    this.validation = validation
  }

  async update (user: IUpdateUser): Promise<void> {
    await this.validation.validate(user)

    await this.checkUserEmailExists(user.email)

    await this.checkRoleExists(+user.role)

    user.password = await this.passwordHashing.hash(user.password)

    await this.repository.update(user)
  }

  private async checkUserEmailExists (email: string) {
    const userExists = await this.repository.findByEmail(email)

    if (!userExists) throw new NotFoundError('E-mail not found')
  }

  private async checkRoleExists (roleId: number) {
    const role = await this.roleRepository.findById(roleId)

    if (!role) throw new NotFoundError('Role not found')
  }
}
