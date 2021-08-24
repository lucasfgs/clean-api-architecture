import 'reflect-metadata'
import 'express-async-errors'

import express from 'express'
import { setupGlobalMiddlewares } from './setup/setupGlobalMIddlewares'
import { setupRoutes } from './setup/setupRoutes'
import { createConnection } from 'typeorm'

export async function run () {
  await createConnection()
  const app = express()

  setupGlobalMiddlewares(app)
  setupRoutes(app)

  return app
}
