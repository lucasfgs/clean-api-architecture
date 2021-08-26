import { IUpdateRole } from '@domain/models/IRole'
import { IRoleRepository } from '@domain/repositories/IRoleRepository'
import { IUpdateRoleUseCase } from '@domain/useCases/role/IUpdateRoleUseCase'
import { DataAlreadyExistsError } from '@presentation/errors/DataAlreadyExistsError'
import { ValidationComposite } from '@presentation/protocols/ValidationComposite'

export class UpdateRoleUseCase implements IUpdateRoleUseCase {
  constructor (private readonly repository: IRoleRepository, private readonly validation: ValidationComposite<IUpdateRole>) {
    this.repository = repository
    this.validation = validation
  }

  async update (role: IUpdateRole): Promise<void> {
    await this.validation.validate(role)

    const roleExists = await this.repository.findByName(role.name)

    if (roleExists) throw new DataAlreadyExistsError('Role already exists')

    await this.repository.update(role)
  }
}
