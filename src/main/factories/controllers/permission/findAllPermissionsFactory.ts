import { PermissionRepository } from '@application/repositories/PermissionRepository'
import { FindAllPermissionsUseCase } from '@application/useCases/permission/FindAllPermissionsUseCase'
import { FindAllPermissionsValidation } from '@application/validation/permission/leaf/FindAllPermissionsValidation'
import { IPermission } from '@domain/models/IPermission'
import { FindAllPermissionsController } from '@presentation/controllers/permission/FindAllpermissionsController'
import { GenericSuccessResponse } from '@presentation/responses/GenericSuccessResponse'

export const findAllPermissionsControllerFactory = () => {
  const permissionValidation = new FindAllPermissionsValidation()
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
