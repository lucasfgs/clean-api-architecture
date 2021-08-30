import { PermissionRepository } from '@application/repositories/PermissionRepository'
import { CreatePermissionUseCase } from '@application/useCases/permission/CreatePermissionUseCase'
import { CreatePermissionValidation } from '@application/validation/permission/composite/CreatePermissionValidation'
import { IPermission } from '@domain/models/IPermission'
import { CreatePermissionController } from '@presentation/controllers/permission/CreatePermissionController'
import { GenericCreatedResponse } from '@presentation/responses/GenericCreatedResponse'

export const createPermissionFactory = () => {
  const permissionValidation = new CreatePermissionValidation()
  const permissionRepository = new PermissionRepository()
  const createPermissionUseCase = new CreatePermissionUseCase(permissionRepository, permissionValidation)

  const createPermissionPresenter = new GenericCreatedResponse<IPermission>()
  const createPermissionController = new CreatePermissionController(createPermissionUseCase, createPermissionPresenter)

  return {
    permissionRepository,
    createPermissionUseCase,
    createPermissionPresenter,
    createPermissionController
  }
}
