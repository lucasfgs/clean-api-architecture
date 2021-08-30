import { IUpdateUser } from '@domain/models/IUser'
import { IRoleRepository } from '@domain/repositories/IRoleRepository'
import { IUserRepository } from '@domain/repositories/IUserRepository'
import { IUpdateUserUseCase } from '@domain/useCases/user/IUpdateUserUseCase'
import { BadRequestError } from '@presentation/errors/BadRequestError'
import { DataAlreadyExistsError } from '@presentation/errors/DataAlreadyExistsError'
import { ValidationComposite } from '@presentation/protocols/ValidationComposite'

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor (private readonly repository: IUserRepository, private readonly roleRepository: IRoleRepository, private readonly validation: ValidationComposite<IUpdateUser>) {
    this.repository = repository
    this.roleRepository = roleRepository
    this.validation = validation
  }

  async update (user: IUpdateUser): Promise<void> {
    await this.validation.validate(user)

    const userExists = await this.repository.findByEmail(user.email)

    if (userExists) throw new DataAlreadyExistsError('E-mail already exists')

    const role = await this.roleRepository.findById(+user.role)

    if (!role) throw new BadRequestError('Role not found')

    await this.repository.update(user)
  }
}
