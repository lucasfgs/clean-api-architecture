import { IUserRepository } from '@domain/repositories/IUserRepository'
import { IDeleteUserUseCase } from '@domain/useCases/user/IDeleteUserUseCase'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'

export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor (private readonly repository: IUserRepository, private readonly validation: ValidationComposite<{ id: number}>) {
    this.repository = repository
    this.validation = validation
  }

  async delete (id: number): Promise<void> {
    await this.validation.validate({ id })

    await this.repository.delete(id)
  }
}
