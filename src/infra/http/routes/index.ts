import { Express, Router } from 'express'
import { readdirSync } from 'fs'

export const setupRoutes = (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  readdirSync(`${__dirname}`).map(async (file) => {
    if (!file.endsWith('.map') && file.includes('routes')) {
      (await import(`./${file}`)).default(router)
    }
  })
}
