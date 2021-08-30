import { ICreateUser, IUser } from '@domain/models/IUser'
import { IRoleRepository } from '@domain/repositories/IRoleRepository'
import { IUserRepository } from '@domain/repositories/IUserRepository'
import { ICreateUserUseCase } from '@domain/useCases/user/ICreateUserUseCase'
import { BadRequestError } from '@presentation/errors/BadRequestError'
import { DataAlreadyExistsError } from '@presentation/errors/DataAlreadyExistsError'
import { ValidationComposite } from '@presentation/protocols/ValidationComposite'

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor (private readonly repository: IUserRepository, private readonly roleRepository: IRoleRepository, private readonly validation: ValidationComposite<ICreateUser>) {
    this.repository = repository
    this.roleRepository = roleRepository
    this.validation = validation
  }

  async create (requestModel: ICreateUser): Promise<IUser> {
    await this.validation.validate(requestModel)

    const userExists = await this.repository.findByEmail(requestModel.email)

    if (userExists) throw new DataAlreadyExistsError('E-mail already exists')

    const role = await this.roleRepository.findById(+requestModel.role)

    if (!role) throw new BadRequestError('Role not found')

    return await this.repository.create(requestModel)
  }
}
