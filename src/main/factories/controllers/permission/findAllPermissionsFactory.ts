import { PermissionRepository } from '@application/repositories/PermissionRepository'
import { FindAllPermissionsUseCase } from '@application/useCases/permission/FindAllPermissionsUseCase'
import { FilterValidation } from '@application/validation/common/leaf/FilterValidation'
import { IPermission } from '@domain/models/IPermission'
import { FindAllPermissionsController } from '@presentation/controllers/permission/FindAllPermissionsController'
import { GenericSuccessResponse } from '@presentation/responses/GenericSuccessResponse'

export const findAllPermissionsFactory = () => {
  const permissionValidation = new FilterValidation()
  const permissionRepository = new PermissionRepository()
  const findAllPermissionsUseCase = new FindAllPermissionsUseCase(permissionRepository, permissionValidation)

  const findAllPermissionsPresenter = new GenericSuccessResponse<IPermission[]>()
  const findAllPermissionsController = new FindAllPermissionsController(findAllPermissionsUseCase, findAllPermissionsPresenter)

  return {
    permissionRepository,
    findAllPermissionsUseCase,
    findAllPermissionsPresenter,
    findAllPermissionsController
  }
}
