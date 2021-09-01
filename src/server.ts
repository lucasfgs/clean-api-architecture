import { run } from './infra/http/app'

(async () => {
  const app = await run()
  app.listen(process.env.SERVER_PORT, () => console.log(`Server listening at port ${process.env.SERVER_PORT}`))
})()
