import { PermissionRoleRepository } from '@application/repositories/PermissionRoleRepository'
import { UpdatePermissionRoleUseCase } from '@application/useCases/permissionRole/UpdatePermissionRoleUseCase'
import { UpdatePermissionRoleValidation } from '@application/validation/permissionRole/composite/UpdatePermissionRoleValidation'
import { UpdatePermissionRoleController } from '@presentation/controllers/permissionRole/UpdatePermissionRoleController'
import { GenericUpdatedResponse } from '@presentation/responses/GenericUpdatedResponse'

export const updatePermissionRoleFactory = () => {
  const permissionRoleValidation = new UpdatePermissionRoleValidation()
  const permissionRoleRepository = new PermissionRoleRepository()
  const updatePermissionRoleUseCase = new UpdatePermissionRoleUseCase(permissionRoleRepository, permissionRoleValidation)

  const updatePermissionRolePresenter = new GenericUpdatedResponse()
  const updatePermissionRoleController = new UpdatePermissionRoleController(updatePermissionRoleUseCase, updatePermissionRolePresenter)

  return {
    permissionRoleRepository,
    updatePermissionRoleUseCase,
    updatePermissionRolePresenter,
    updatePermissionRoleController
  }
}
