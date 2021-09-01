import { isAPositiveNumber } from '@application/helpers/numbers/isAPositiveNumber'
import { isString } from '@application/helpers/strings/isString'
import { ICreateUser } from '@domain/models/IUser'
import { RequestValidationError } from '@application/errors/RequestValidationError'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'

export class UserRequiredFieldsValidation extends ValidationComposite<ICreateUser> {
  validate (request: ICreateUser): void {
    const error = new RequestValidationError('Invalid request')

    const { name, email, password, role } = request

    if (!isString(name)) { error.messages.push('Invalid field: name') }

    if (!isString(email)) { error.messages.push('Invalid field: email') }

    if (!isString(password)) { error.messages.push('Invalid field: password') }

    if (!isAPositiveNumber(+role)) { error.messages.push('Invalid field: role') }

    if (error.messages.length > 1) { throw error }
  }
}
