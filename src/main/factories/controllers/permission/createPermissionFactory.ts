import { PermissionRepository } from '@application/repositories/PermissionRepository'
import { CreatePermissionUseCase } from '@application/useCases/permission/CreatePermissionUseCase'
import { IPermission } from '@data/models/IPermission'
import { CreatePermissionController } from '@presentation/controllers/permission/CreatePermissionController'
import { GenericCreatedResponse } from '@presentation/responses/GenericCreatedResponse'

export const createPermissionControllerFactory = () => {
  const permissionRepository = new PermissionRepository()
  const createPermissionUseCase = new CreatePermissionUseCase(permissionRepository)

  const createPermissionPresenter = new GenericCreatedResponse<IPermission>()
  const createPermissionController = new CreatePermissionController(createPermissionUseCase, createPermissionPresenter)

  return {
    permissionRepository,
    createPermissionUseCase,
    createPermissionPresenter,
    createPermissionController
  }
}
