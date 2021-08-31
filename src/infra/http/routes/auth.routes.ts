import { Router } from 'express'
import { routeAdapter } from '@main/adapters/http/routeAdapter'
import { loginFactory } from '@main/factories/controllers/auth/loginFactory'

export default (router: Router): void => {
  const { loginController } = loginFactory()

  router.post('/auth/login', routeAdapter(loginController))
}
