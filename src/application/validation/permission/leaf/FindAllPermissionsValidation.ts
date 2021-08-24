import { isAPositiveNumber } from '@application/helpers/numbers/isAPositiveNumber'
import { IFindAllPermissionsRequestModel } from '@domain/useCases/permission/IFindAllPermissionsUseCase'
import { RequestValidationError } from '@presentation/errors/RequestValidationError'
import { ValidationComposite } from '@presentation/protocols/ValidationComposite'

export class FindAllPermissionsValidation extends ValidationComposite<IFindAllPermissionsRequestModel> {
  validate (request: IFindAllPermissionsRequestModel): void {
    if (!request) return

    if (request.order && !request.order.match(/desc|asc/i)) {
      throw new RequestValidationError('Order must be desc or asc')
    }

    this.validatePositiveNumberIfExists(request.limit)
    this.validatePositiveNumberIfExists(request.offset)
  }

  private validatePositiveNumberIfExists (
    value?: string | number
  ): void | never {
    if (!value) {
      return
    }

    if (isAPositiveNumber(value)) {
      throw new RequestValidationError('Expected a positive number')
    }
  }
}
