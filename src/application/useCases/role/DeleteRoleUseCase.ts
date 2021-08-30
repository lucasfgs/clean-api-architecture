import { IRoleRepository } from '@domain/repositories/IRoleRepository'
import { IDeleteRoleUseCase } from '@domain/useCases/role/IDeleteRoleUseCase'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'

export class DeleteRoleUseCase implements IDeleteRoleUseCase {
  constructor (private readonly repository: IRoleRepository, private readonly validation: ValidationComposite<{ id: number}>) {
    this.repository = repository
    this.validation = validation
  }

  async delete (id: number): Promise<void> {
    await this.validation.validate({ id })

    await this.repository.delete(id)
  }
}
