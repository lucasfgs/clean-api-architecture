/* eslint-disable array-callback-return */
import { isAPositiveNumber } from '@application/helpers/numbers/isAPositiveNumber'
import { RequestValidationError } from '@application/errors/RequestValidationError'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'

type ParamRequest = {
    id: number
}

export class IdParamValidation<T = ParamRequest> extends ValidationComposite<T> {
  validate (request: T): void {
    if (!request) return

    Object.entries(request).map(value => {
      this.validatePositiveNumberIfExists(+value[1], value[0])
    })
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
