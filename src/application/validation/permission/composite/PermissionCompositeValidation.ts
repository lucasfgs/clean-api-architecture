import { ICreatePermission } from '@domain/models/IPermission'
import { InternalServerError } from '@application/errors/InternalServerError'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'

export class PermissionCompositeValidation extends ValidationComposite<ICreatePermission> {
  async validate (
    request: ICreatePermission
  ): Promise<void> {
    if (this.validations.length === 0) {
      throw new InternalServerError('Composite has no validations')
    }

    for (const validation of this.validations) {
      await validation.validate(request)
    }
  }
}
