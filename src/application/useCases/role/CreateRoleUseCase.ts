import { ICreateRole, IRole } from '@domain/models/IRole'
import { IRoleRepository } from '@domain/repositories/IRoleRepository'
import { ICreateRoleUseCase } from '@domain/useCases/role/ICreateRoleUseCase'
import { DataAlreadyExistsError } from '@application/errors/DataAlreadyExistsError'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'

export class CreateRoleUseCase implements ICreateRoleUseCase {
  constructor (private readonly repository: IRoleRepository, private readonly validation: ValidationComposite<ICreateRole>) {
    this.repository = repository
    this.validation = validation
  }

  async create (requestModel: ICreateRole): Promise<IRole> {
    await this.validation.validate(requestModel)

    await this.checkRoleExists(requestModel.name)

    return await this.repository.create(requestModel)
  }

  private async checkRoleExists (name: string) {
    const roleExists = await this.repository.findByName(name)

    if (roleExists) throw new DataAlreadyExistsError('Role already exists')
  }
}
