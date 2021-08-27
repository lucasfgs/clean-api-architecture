import { PermissionRoleRepository } from '@application/repositories/PermissionRoleRepository'
import { DeletePermissionRoleUseCase } from '@application/useCases/permissionRole/DeletePermissionRoleUseCase'
import { IdParamValidation } from '@application/validation/common/leaf/IdParamValidation'
import { DeletePermissionRoleController } from '@presentation/controllers/permissionRole/DeletePermissionRoleController'
import { GenecricDeletedResponse } from '@presentation/responses/GenericDeletedResponse'

export const deletePermissionRoleFactory = () => {
  const permissionRoleValidation = new IdParamValidation<{permissionId: number, roleId: number}>()
  const permissionRoleRepository = new PermissionRoleRepository()
  const deletePermissionRoleUseCase = new DeletePermissionRoleUseCase(permissionRoleRepository, permissionRoleValidation)

  const deletePermissionRolePresenter = new GenecricDeletedResponse()
  const deletePermissionRoleController = new DeletePermissionRoleController(deletePermissionRoleUseCase, deletePermissionRolePresenter)

  return {
    permissionRoleRepository,
    deletePermissionRoleUseCase,
    deletePermissionRolePresenter,
    deletePermissionRoleController
  }
}
