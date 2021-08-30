import { Router } from 'express'
import { createPermissionFactory } from '@main/factories/controllers/permission/createPermissionFactory'
import { routeAdapter } from '@main/adapters/http/routeAdapter'
import { findAllPermissionsFactory } from '@main/factories/controllers/permission/findAllPermissionsFactory'
import { updatePermissionFactory } from '@main/factories/controllers/permission/updatePermissionFactory'
import { deletePermissionFactory } from '@main/factories/controllers/permission/deletePermissionFactory'

export default (router: Router): void => {
  const { findAllPermissionsController } = findAllPermissionsFactory()
  const { createPermissionController } = createPermissionFactory()
  const { updatePermissionController } = updatePermissionFactory()
  const { deletePermissionController } = deletePermissionFactory()

  router.get('/permissions', routeAdapter(findAllPermissionsController))
  router.post('/permissions', routeAdapter(createPermissionController))
  router.put('/permissions/:id', routeAdapter(updatePermissionController))
  router.delete('/permissions/:id', routeAdapter(deletePermissionController))
}
