import { createRoleFactory } from '@main/factories/controllers/role/createRoleFactory'
import { deleteRoleFactory } from '@main/factories/controllers/role/deleteRoleFactory'
import { findAllRolesFactory } from '@main/factories/controllers/role/findAllRolesFactory'
import { updateRolesFactory } from '@main/factories/controllers/role/updateRolesFactory'
import { Router } from 'express'
import { routeAdapter } from '../../../main/adapters/http/routeAdapter'

export default (router: Router): void => {
  const { createRoleController } = createRoleFactory()
  const { findAllRolesController } = findAllRolesFactory()
  const { updateRoleController } = updateRolesFactory()
  const { deleteRoleController } = deleteRoleFactory()

  router.get('/roles', routeAdapter(findAllRolesController))
  router.post('/roles', routeAdapter(createRoleController))
  router.put('/roles/:id', routeAdapter(updateRoleController))
  router.delete('/roles/:id', routeAdapter(deleteRoleController))
}
