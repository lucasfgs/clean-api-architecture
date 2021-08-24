import { Router } from 'express'
import { createPermissionControllerFactory } from '@main/factories/controllers/permission/createPermissionFactory'
import { routeAdapter } from '../adapters/routeAdapter'

export default (router: Router): void => {
  const { createPermissionController } = createPermissionControllerFactory()

  router.post('/permissions', routeAdapter(createPermissionController))
}
