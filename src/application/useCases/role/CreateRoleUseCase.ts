import { ICreateRole, IRole } from '@domain/models/IRole'
import { IRoleRepository } from '@domain/repositories/IRoleRepository'
import { ICreateRoleUseCase } from '@domain/useCases/role/ICreateRoleUseCase'
import { DataAlreadyExistsError } from '@presentation/errors/DataAlreadyExistsError'
import { ValidationComposite } from '@presentation/protocols/ValidationComposite'

export class CreateRoleUseCase implements ICreateRoleUseCase {
  constructor (private readonly repository: IRoleRepository, private readonly validation: ValidationComposite<ICreateRole>) {
    this.repository = repository
    this.validation = validation
  }

  async create (requestModel: ICreateRole): Promise<IRole> {
    await this.validation.validate(requestModel)

    const roleExists = await this.repository.findByName(requestModel.name)

    if (roleExists) throw new DataAlreadyExistsError('Role already exists')

    return await this.repository.create(requestModel)
  }
}
