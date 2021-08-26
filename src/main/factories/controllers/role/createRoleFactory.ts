import { RoleRepository } from '@application/repositories/RoleRepository'
import { CreateRoleUseCase } from '@application/useCases/role/CreateRoleUseCase'
import { RoleRequiredFieldsValidation } from '@application/validation/role/leaf/RoleRequiredFieldsValidation'
import { IRole } from '@domain/models/IRole'
import { CreateRoleController } from '@presentation/controllers/role/CreateRoleController'
import { GenericCreatedResponse } from '@presentation/responses/GenericCreatedResponse'

export const createRoleFactory = () => {
  const roleValidation = new RoleRequiredFieldsValidation()
  const roleRepository = new RoleRepository()
  const createRoleUseCase = new CreateRoleUseCase(roleRepository, roleValidation)

  const createRolePresenter = new GenericCreatedResponse<IRole>()
  const createRoleController = new CreateRoleController(createRoleUseCase, createRolePresenter)

  return {
    roleRepository,
    createRoleUseCase,
    createRolePresenter,
    createRoleController
  }
}
