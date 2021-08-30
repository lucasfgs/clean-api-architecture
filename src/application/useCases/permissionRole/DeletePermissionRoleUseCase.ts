import { IPermissionRoleRepository } from '@domain/repositories/IPermissionRoleRepository'
import { IDeletePermissionRoleUseCase } from '@domain/useCases/permissionRole/IDeletePermissionRoleUseCase'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'

export class DeletePermissionRoleUseCase implements IDeletePermissionRoleUseCase {
  constructor (private readonly repository: IPermissionRoleRepository, private readonly validation: ValidationComposite<{ permissionId: number, roleId: number}>) {
    this.repository = repository
    this.validation = validation
  }

  async delete (permissionId: number, roleId: number): Promise<void> {
    await this.validation.validate({ permissionId, roleId })

    await this.repository.delete(permissionId, roleId)
  }
}
