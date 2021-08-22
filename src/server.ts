import { run } from './infra/http/app'

(async () => {
  const app = await run()
  app.listen(8000, () => console.log('Server listening at port 8000'))
})()
