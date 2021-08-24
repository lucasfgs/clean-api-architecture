import { isString } from '@application/helpers/strings/isString'
import { ICreatePermission } from '@domain/models/IPermission'
import { RequestValidationError } from '@presentation/errors/RequestValidationError'
import { ValidationComposite } from '@presentation/protocols/ValidationComposite'

export class PermissionRequiredFieldsValidation extends ValidationComposite<ICreatePermission> {
  validate (request: ICreatePermission): void {
    const error = new RequestValidationError('Invalid request')

    const { name } = request

    if (!isString(name) || !name) { error.messages.push('Invalid field: name') }

    if (error.messages.length > 1) { throw error }
  }
}
