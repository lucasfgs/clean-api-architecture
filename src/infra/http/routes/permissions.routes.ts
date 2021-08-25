import { Router } from 'express'
import { createPermissionControllerFactory } from '@main/factories/controllers/permission/createPermissionFactory'
import { routeAdapter } from '../adapters/routeAdapter'
import { findAllPermissionsControllerFactory } from '@main/factories/controllers/permission/findAllPermissionsFactory'
import { updatePermissionFactory } from '@main/factories/controllers/permission/updatePermissionFactory'

export default (router: Router): void => {
  const { findAllPermissionsController } = findAllPermissionsControllerFactory()
  const { createPermissionController } = createPermissionControllerFactory()
  const { updatePermissionController } = updatePermissionFactory()

  router.get('/permissions', routeAdapter(findAllPermissionsController))
  router.post('/permissions', routeAdapter(createPermissionController))
  router.put('/permissions/:id', routeAdapter(updatePermissionController))
}
