import { isString } from '@application/helpers/strings/isString'
import { ICreateRole } from '@domain/models/IRole'
import { RequestValidationError } from '@presentation/errors/RequestValidationError'
import { ValidationComposite } from '@presentation/protocols/ValidationComposite'

export class RoleRequiredFieldsValidation extends ValidationComposite<ICreateRole> {
  validate (request: ICreateRole): void {
    const error = new RequestValidationError('Invalid request')

    const { name } = request

    if (!isString(name) || !name) { error.messages.push('Invalid field: name') }

    if (error.messages.length > 1) { throw error }
  }
}
