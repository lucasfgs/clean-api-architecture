import { PermissionRequiredFieldsValidation } from '../leaf/PermissionRequiredFieldsValidation'
import { PermissionCompositeValidation } from './PermissionCompositeValidation'

export class CreatePermissionValidation extends PermissionCompositeValidation {
  constructor () {
    super()
    this.add(new PermissionRequiredFieldsValidation())
  }
}
