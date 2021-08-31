import { PermissionRoleRepository } from '@application/repositories/PermissionRoleRepository'
import { FindAllPermissionRolesUseCase } from '@application/useCases/permissionRole/FindAllPermissionRolesUseCase'
import { FilterValidation } from '@application/validation/common/leaf/FilterValidation'
import { IPermissionRole } from '@domain/models/IPermissionRole'
import { FindAllPermissionRolesController } from '@presentation/controllers/permissionRole/FindAlPermissionlRolesController'
import { GenericSuccessResponse } from '@presentation/responses/GenericSuccessResponse'

export const findAllPermissionsRolesFactory = () => {
  const permissionRoleValidation = new FilterValidation()
  const permissionRoleRepository = new PermissionRoleRepository()
  const findAllPermissionRolesUseCase = new FindAllPermissionRolesUseCase(permissionRoleRepository, permissionRoleValidation)

  const findAllPermissionRolesPresenter = new GenericSuccessResponse<IPermissionRole[]>()
  const findAllPermissionRolesController = new FindAllPermissionRolesController(findAllPermissionRolesUseCase, findAllPermissionRolesPresenter)

  return {
    permissionRoleRepository,
    findAllPermissionRolesUseCase,
    findAllPermissionRolesPresenter,
    findAllPermissionRolesController
  }
}
