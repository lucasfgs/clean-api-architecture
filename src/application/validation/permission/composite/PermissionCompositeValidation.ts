import { ICreatePermission } from '@data/models/IPermission'
import { InternalServerError } from '@presentation/errors/InternalServerError'
import { ValidationComposite } from '@presentation/protocols/ValidationComposite'

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