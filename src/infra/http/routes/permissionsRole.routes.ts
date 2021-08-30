import { Router } from 'express'
import { routeAdapter } from '@main/adapters/http/routeAdapter'
import { findAllPermissionsRolesFactory } from '@main/factories/controllers/permissionRole/findAllPermissionsRoleFactory'
import { createPermissionRoleFactory } from '@main/factories/controllers/permissionRole/createPermissionRoleFactory'
import { updatePermissionRoleFactory } from '@main/factories/controllers/permissionRole/updatePermissionRoleFactory'
import { deletePermissionRoleFactory } from '@main/factories/controllers/permissionRole/deletePermissionRoleFactory'

export default (router: Router): void => {
  const { findAllPermissionRolesController } = findAllPermissionsRolesFactory()
  const { createPermissionRoleController } = createPermissionRoleFactory()
  const { updatePermissionRoleController } = updatePermissionRoleFactory()
  const { deletePermissionRoleController } = deletePermissionRoleFactory()

  router.get('/permissions/roles', routeAdapter(findAllPermissionRolesController))
  router.post('/permissions/roles', routeAdapter(createPermissionRoleController))
  router.put('/permissions/:permission_id/roles/:role_id', routeAdapter(updatePermissionRoleController))
  router.delete('/permissions/:permission_id/roles/:role_id', routeAdapter(deletePermissionRoleController))
}
