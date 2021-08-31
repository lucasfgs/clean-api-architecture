import { RoleRepository } from '@application/repositories/RoleRepository'
import { DeleteRoleUseCase } from '@application/useCases/role/DeleteRoleUseCase'
import { IdParamValidation } from '@application/validation/common/leaf/IdParamValidation'
import { DeleteRoleController } from '@presentation/controllers/role/DeleteRoleController'
import { GenecricDeletedResponse } from '@presentation/responses/GenericDeletedResponse'

export const deleteRoleFactory = () => {
  const roleValidation = new IdParamValidation()
  const roleRepository = new RoleRepository()
  const deleteRoleUseCase = new DeleteRoleUseCase(roleRepository, roleValidation)

  const deleteRolePresenter = new GenecricDeletedResponse()
  const deleteRoleController = new DeleteRoleController(deleteRoleUseCase, deleteRolePresenter)

  return {
    roleRepository,
    deleteRoleUseCase,
    deleteRolePresenter,
    deleteRoleController
  }
}
