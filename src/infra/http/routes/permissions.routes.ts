import { Router } from 'express'
import { createPermissionControllerFactory } from '@main/factories/controllers/permission/createPermissionFactory'
import { routeAdapter } from '../adapters/routeAdapter'
import { findAllPermissionsControllerFactory } from '@main/factories/controllers/permission/findAllPermissionsFactory'

export default (router: Router): void => {
  const { findAllPermissionsController } = findAllPermissionsControllerFactory()
  const { createPermissionController } = createPermissionControllerFactory()

  router.get('/permissions', routeAdapter(findAllPermissionsController))
  router.post('/permissions', routeAdapter(createPermissionController))
}
