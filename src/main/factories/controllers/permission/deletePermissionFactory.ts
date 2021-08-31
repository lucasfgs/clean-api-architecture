import { PermissionRepository } from '@application/repositories/PermissionRepository'
import { DeletePermissionUseCase } from '@application/useCases/permission/DeletePermissionUseCase'
import { IdParamValidation } from '@application/validation/common/leaf/IdParamValidation'
import { DeletePermissionController } from '@presentation/controllers/permission/DeletePermissionController'
import { GenecricDeletedResponse } from '@presentation/responses/GenericDeletedResponse'

export const deletePermissionFactory = () => {
  const permissionValidation = new IdParamValidation()
  const permissionRepository = new PermissionRepository()
  const deletePermissionUseCase = new DeletePermissionUseCase(permissionRepository, permissionValidation)

  const deletePermissionPresenter = new GenecricDeletedResponse()
  const deletePermissionController = new DeletePermissionController(deletePermissionUseCase, deletePermissionPresenter)

  return {
    permissionRepository,
    deletePermissionUseCase,
    deletePermissionPresenter,
    deletePermissionController
  }
}
