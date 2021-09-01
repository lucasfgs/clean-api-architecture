import { ICreatePermissionRole } from '@domain/models/IPermissionRole'
import { InternalServerError } from '@application/errors/InternalServerError'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'

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
