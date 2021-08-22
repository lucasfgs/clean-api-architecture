import { Application, json } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

export const setupGlobalMiddlewares = (app: Application): void => {
  app.use(morgan('dev'))
  app.use(helmet())
  app.use(json())
}
