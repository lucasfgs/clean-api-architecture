import { IUpdateUser } from '@domain/models/IUser'
import { IRoleRepository } from '@domain/repositories/IRoleRepository'
import { IUserRepository } from '@domain/repositories/IUserRepository'
import { IUpdateUserUseCase } from '@domain/useCases/user/IUpdateUserUseCase'
import { DataAlreadyExistsError } from '@presentation/errors/DataAlreadyExistsError'
import { NotFoundError } from '@presentation/errors/NotFoundError'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor (private readonly repository: IUserRepository, private readonly roleRepository: IRoleRepository, private readonly validation: ValidationComposite<IUpdateUser>) {
    this.repository = repository
    this.roleRepository = roleRepository
    this.validation = validation
  }

  async update (user: IUpdateUser): Promise<void> {
    await this.validation.validate(user)

    await this.checkUserEmailExists(user.email)

    await this.checkRoleExists(+user.role)

    await this.repository.update(user)
  }

  private async checkUserEmailExists (email: string) {
    const userExists = await this.repository.findByEmail(email)

    if (userExists) throw new DataAlreadyExistsError('E-mail already exists')
  }

  private async checkRoleExists (roleId: number) {
    const role = await this.roleRepository.findById(roleId)

    if (!role) throw new NotFoundError('Role not found')
  }
}
