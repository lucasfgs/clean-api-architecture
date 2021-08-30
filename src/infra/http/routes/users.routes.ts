import { Router } from 'express'
import { routeAdapter } from '../../../main/adapters/http/routeAdapter'
import { findAllUsersFactory } from '@main/factories/controllers/user/findAllUsersFactory'
import { createUserFactory } from '@main/factories/controllers/user/createUserFactory'
import { updateUsersFactory } from '@main/factories/controllers/user/updateUsersFactory'
import { deleteUserFactory } from '@main/factories/controllers/user/deleteUserFactory'

export default (router: Router): void => {
  const { findAllUsersController } = findAllUsersFactory()
  const { createUserController } = createUserFactory()
  const { updateUserController } = updateUsersFactory()
  const { deleteUserController } = deleteUserFactory()

  router.get('/users', routeAdapter(findAllUsersController))
  router.post('/users', routeAdapter(createUserController))
  router.put('/users/:id', routeAdapter(updateUserController))
  router.delete('/users/:id', routeAdapter(deleteUserController))
}
