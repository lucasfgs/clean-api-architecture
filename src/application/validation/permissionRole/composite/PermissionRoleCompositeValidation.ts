import { ICreatePermissionRole } from '@domain/models/IPermissionRole'
import { InternalServerError } from '@presentation/errors/InternalServerError'
import { ValidationComposite } from '@presentation/protocols/ValidationComposite'

export class PermissionRoleCompositeValidation extends ValidationComposite<ICreatePermissionRole> {
  async validate (
    request: ICreatePermissionRole
  ): Promise<void> {
    if (this.validations.length === 0) {
      throw new InternalServerError('Composite has no validations')
    }

    for (const validation of this.validations) {
      await validation.validate(request)
    }
  }
}
