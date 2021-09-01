import { isBoolean } from '@application/helpers/boolean/isBoolean'
import { isAPositiveNumber } from '@application/helpers/numbers/isAPositiveNumber'
import { ICreatePermissionRole } from '@domain/models/IPermissionRole'
import { RequestValidationError } from '@application/errors/RequestValidationError'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'

export class PermissionRoleRequiredFieldsValidation extends ValidationComposite<ICreatePermissionRole> {
  validate (request: ICreatePermissionRole): void {
    const { create, delete: destroy, update, read, permission, role } = request

    const error = new RequestValidationError('Invalid request')

    if (!isBoolean(read)) { error.messages.push('Invalid field: read') }

    if (!isBoolean(create)) { error.messages.push('Invalid field: create') }

    if (!isBoolean(update)) { error.messages.push('Invalid field: update') }

    if (!isBoolean(destroy)) { error.messages.push('Invalid field: destroy') }

    this.validatePositiveNumberIfExists(+permission, 'permission')

    this.validatePositiveNumberIfExists(+role, 'role')

    if (error.messages.length > 1) { throw error }
  }

  private validatePositiveNumberIfExists (
    value: string | number,
    field: string
  ): void | never {
    if (!isAPositiveNumber(value)) {
      throw new RequestValidationError(`Expected a positive number: ${field}`)
    }
  }
}
