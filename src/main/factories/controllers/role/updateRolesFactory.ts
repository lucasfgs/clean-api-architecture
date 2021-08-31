import { RoleRepository } from '@application/repositories/RoleRepository'
import { UpdateRoleUseCase } from '@application/useCases/role/UpdateRoleUseCase'
import { RoleRequiredFieldsValidation } from '@application/validation/role/leaf/RoleRequiredFieldsValidation'
import { UpdateRoleController } from '@presentation/controllers/role/UpdateRoleController'
import { GenericUpdatedResponse } from '@presentation/responses/GenericUpdatedResponse'

export const updateRolesFactory = () => {
  const roleValidation = new RoleRequiredFieldsValidation()
  const roleRepository = new RoleRepository()
  const updateRoleUseCase = new UpdateRoleUseCase(roleRepository, roleValidation)

  const updateRolePresenter = new GenericUpdatedResponse()
  const updateRoleController = new UpdateRoleController(updateRoleUseCase, updateRolePresenter)

  return {
    roleRepository,
    updateRoleUseCase,
    updateRolePresenter,
    updateRoleController
  }
}
