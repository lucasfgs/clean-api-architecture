import { IdParamValidation } from '@application/validation/common/leaf/IdParamValidation'
import { PermissionRolePartialFields } from '../leaf/PermissionRolePartialFields'
import { PermissionRoleCompositeValidation } from './PermissionRoleCompositeValidation'

export class UpdatePermissionRoleValidation extends PermissionRoleCompositeValidation {
  constructor () {
    super()
    this.add(new IdParamValidation())
    this.add(new PermissionRolePartialFields())
  }
}
