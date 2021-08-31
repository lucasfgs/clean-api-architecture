import { RoleRepository } from '@application/repositories/RoleRepository'
import { FindAllRolesUseCase } from '@application/useCases/role/FindAllRolesUseCase'
import { FilterValidation } from '@application/validation/common/leaf/FilterValidation'
import { IRole } from '@domain/models/IRole'
import { FindAllRolesController } from '@presentation/controllers/role/FindAllRolesController'
import { GenericSuccessResponse } from '@presentation/responses/GenericSuccessResponse'

export const findAllRolesFactory = () => {
  const permissionValidation = new FilterValidation()
  const roleRepository = new RoleRepository()
  const findAllRoleUseCase = new FindAllRolesUseCase(roleRepository, permissionValidation)

  const findAllRolesPresenter = new GenericSuccessResponse<IRole[]>()
  const findAllRolesController = new FindAllRolesController(findAllRoleUseCase, findAllRolesPresenter)

  return {
    roleRepository,
    findAllRoleUseCase,
    findAllRolesPresenter,
    findAllRolesController
  }
}
