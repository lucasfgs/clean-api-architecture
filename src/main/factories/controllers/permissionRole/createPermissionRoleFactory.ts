import { PermissionRoleRepository } from '@application/repositories/PermissionRoleRepository'
import { CreatePermissionRoleUseCase } from '@application/useCases/permissionRole/CreatePermissionRoleUseCase'
import { PermissionRoleRequiredFieldsValidation } from '@application/validation/permissionRole/leaf/PermissionRoleRequiredFieldsValidation'
import { IPermissionRole } from '@domain/models/IPermissionRole'
import { CreatePermissionRoleController } from '@presentation/controllers/permissionRole/CreatePermissionRoleController'
import { GenericCreatedResponse } from '@presentation/responses/GenericCreatedResponse'

export const createPermissionRoleFactory = () => {
  const permissionRoleValidation = new PermissionRoleRequiredFieldsValidation()
  const permissionRoleRepository = new PermissionRoleRepository()
  const createPermissionRoleUseCase = new CreatePermissionRoleUseCase(permissionRoleRepository, permissionRoleValidation)

  const createPermissionRolePresenter = new GenericCreatedResponse<IPermissionRole>()
  const createPermissionRoleController = new CreatePermissionRoleController(createPermissionRoleUseCase, createPermissionRolePresenter)

  return {
    permissionRoleRepository,
    createPermissionRoleUseCase,
    createPermissionRolePresenter,
    createPermissionRoleController
  }
}
