import { ICreateUser, IUser } from '@domain/models/IUser'
import { IRoleRepository } from '@domain/repositories/IRoleRepository'
import { IUserRepository } from '@domain/repositories/IUserRepository'
import { ICreateUserUseCase } from '@domain/useCases/user/ICreateUserUseCase'
import { DataAlreadyExistsError } from '@application/errors/DataAlreadyExistsError'
import { NotFoundError } from '@application/errors/NotFoundError'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'
import { PasswordHashing } from '@application/protocols/security/PasswordHashing'

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor (
    private readonly repository: IUserRepository,
    private readonly roleRepository: IRoleRepository,
    private readonly passwordHashing: PasswordHashing,
     private readonly validation: ValidationComposite<ICreateUser>) {
    this.repository = repository
    this.roleRepository = roleRepository
    this.passwordHashing = passwordHashing
    this.validation = validation
  }

  async create (requestModel: ICreateUser): Promise<IUser> {
    await this.validation.validate(requestModel)

    await this.checkUserEmailExists(requestModel.email)

    await this.checkRoleExists(+requestModel.role)

    requestModel.password = await this.passwordHashing.hash(requestModel.password)

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
