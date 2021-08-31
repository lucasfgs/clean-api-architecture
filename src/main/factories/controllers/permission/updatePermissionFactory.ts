import { PermissionRepository } from '@application/repositories/PermissionRepository'
import { UpdatePermissionUseCase } from '@application/useCases/permission/UpdatePermissionUseCase'
import { PermissionRequiredFieldsValidation } from '@application/validation/permission/leaf/PermissionRequiredFieldsValidation'
import { UpdatePermissionController } from '@presentation/controllers/permission/UpdatePermissionController'
import { GenericUpdatedResponse } from '@presentation/responses/GenericUpdatedResponse'

export const updatePermissionFactory = () => {
  const permissionValidation = new PermissionRequiredFieldsValidation()
  const permissionRepository = new PermissionRepository()
  const updatePermissionUseCase = new UpdatePermissionUseCase(permissionRepository, permissionValidation)

  const updatePermissionPresenter = new GenericUpdatedResponse()
  const updatePermissionController = new UpdatePermissionController(updatePermissionUseCase, updatePermissionPresenter)

  return {
    permissionRepository,
    updatePermissionUseCase,
    updatePermissionPresenter,
    updatePermissionController
  }
}
