import { ICreateUser, IUser } from '@domain/models/IUser'
import { IRoleRepository } from '@domain/repositories/IRoleRepository'
import { IUserRepository } from '@domain/repositories/IUserRepository'
import { ICreateUserUseCase } from '@domain/useCases/user/ICreateUserUseCase'
import { DataAlreadyExistsError } from '@presentation/errors/DataAlreadyExistsError'
import { NotFoundError } from '@presentation/errors/NotFoundError'
import { ValidationComposite } from '@presentation/protocols/ValidationComposite'

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor (private readonly repository: IUserRepository, private readonly roleRepository: IRoleRepository, private readonly validation: ValidationComposite<ICreateUser>) {
    this.repository = repository
    this.roleRepository = roleRepository
    this.validation = validation
  }

  async create (requestModel: ICreateUser): Promise<IUser> {
    await this.validation.validate(requestModel)

    await this.checkUserEmailExists(requestModel.email)

    await this.checkRoleExists(+requestModel.role)

    return await this.repository.create(requestModel)
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
