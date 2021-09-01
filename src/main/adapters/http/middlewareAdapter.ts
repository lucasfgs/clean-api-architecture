import { NextFunction, Request, Response } from 'express'
import { Middleware } from '@application/protocols/middlewares/middleware'
import { DefaultApplicationError } from '@application/errors/DefaultApplicationError'

export const middlewareAdapter = (middleware: Middleware, permission?: string, role?: string[]) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    return Promise.resolve(
      middleware.handle({
        query: request.query,
        params: request.params,
        body: request.body,
        headers: request.headers,
        method: request.method
      }, permission, role)
    )
      .then(() => {
        return next()
      })
      .catch((error: DefaultApplicationError) => {
        return next(error)
      })
  }
}
