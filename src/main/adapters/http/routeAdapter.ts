import { NextFunction, Request, Response } from 'express'
import { DefaultApplicationError } from '@application/errors/DefaultApplicationError'
import { Controller } from '@application/protocols/controllers/Controller'

export const routeAdapter = <T>(controller: Controller<T>) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    return Promise.resolve(
      controller.handle({
        query: request.query,
        params: request.params,
        body: request.body,
        headers: request.headers
      })
    )
      .then((controllerResponse) => {
        response
          .status(controllerResponse.statusCode)
          .json(controllerResponse.body)
        return next()
      })
      .catch((error: DefaultApplicationError) => {
        return next(error)
      })
  }
}
