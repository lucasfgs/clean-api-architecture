import { isAPositiveNumber } from '@application/helpers/numbers/isAPositiveNumber'
import { RequestValidationError } from '@presentation/errors/RequestValidationError'
import { ValidationComposite } from '@presentation/protocols/ValidationComposite'

type ParamRequest = {
    id: number
}

export class IdParamValidation extends ValidationComposite<ParamRequest> {
  validate (request: ParamRequest): void {
    if (!request) return

    this.validatePositiveNumberIfExists(request.id)
  }

  private validatePositiveNumberIfExists (
    value?: string | number
  ): void | never {
    if (!value) {
      return
    }

    if (!isAPositiveNumber(value)) {
      throw new RequestValidationError('Expected a positive number')
    }
  }
}
