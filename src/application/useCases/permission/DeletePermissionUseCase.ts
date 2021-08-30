import { IPermissionRepository } from '@domain/repositories/IPermissionRepository'
import { IDeletePermissionUseCase } from '@domain/useCases/permission/IDeletePermissionUseCase'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'

export class DeletePermissionUseCase implements IDeletePermissionUseCase {
  constructor (private readonly permissionRepository: IPermissionRepository, private readonly validation: ValidationComposite<{ id: number}>) {
    this.permissionRepository = permissionRepository
    this.validation = validation
  }

  async delete (id: number): Promise<void> {
    await this.validation.validate({ id })

    await this.permissionRepository.delete(id)
  }
}
