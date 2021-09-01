import { IUpdateRole } from '@domain/models/IRole'
import { IRoleRepository } from '@domain/repositories/IRoleRepository'
import { IUpdateRoleUseCase } from '@domain/useCases/role/IUpdateRoleUseCase'
import { DataAlreadyExistsError } from '@application/errors/DataAlreadyExistsError'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'

export class UpdateRoleUseCase implements IUpdateRoleUseCase {
  constructor (private readonly repository: IRoleRepository, private readonly validation: ValidationComposite<IUpdateRole>) {
    this.repository = repository
    this.validation = validation
  }

  async update (role: IUpdateRole): Promise<void> {
    await this.validation.validate(role)

    await this.checkRoleExists(role.name)

    await this.repository.update(role)
  }

  private async checkRoleExists (name: string) {
    const roleExists = await this.repository.findByName(name)

    if (roleExists) throw new DataAlreadyExistsError('Role already exists')
  }
}
