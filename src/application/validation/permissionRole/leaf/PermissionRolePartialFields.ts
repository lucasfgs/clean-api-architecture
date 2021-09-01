import { isBoolean } from '@application/helpers/boolean/isBoolean'
import { IUpdatePermissionRole } from '@domain/models/IPermissionRole'
import { RequestValidationError } from '@application/errors/RequestValidationError'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'

export class PermissionRolePartialFields extends ValidationComposite<IUpdatePermissionRole> {
  validate (request: IUpdatePermissionRole): void {
    const { create, delete: destroy, update, read } = request

    const error = new RequestValidationError('Invalid request')

    if (!isBoolean(read)) { error.messages.push('Invalid field: read') }

    if (!isBoolean(create)) { error.messages.push('Invalid field: create') }

    if (!isBoolean(update)) { error.messages.push('Invalid field: update') }

    if (!isBoolean(destroy)) { error.messages.push('Invalid field: destroy') }

    if (error.messages.length > 1) { throw error }
  }
}
