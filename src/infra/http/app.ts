import 'reflect-metadata'
import 'express-async-errors'

import express from 'express'
import { setupGlobalMiddlewares } from './setup/setupGlobalMIddlewares'
import { setupRoutes } from './setup/setupRoutes'
import { createConnection } from 'typeorm'
import { setupErrorHandler } from './setup/setupErrorHandler'

export async function run () {
  await createConnection()
  const app = express()

  setupGlobalMiddlewares(app)
  setupRoutes(app)
  setupErrorHandler(app)

  return app
}
