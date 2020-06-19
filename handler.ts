import { Router } from 'https://deno.land/x/oak@v4.0.0/mod.ts'

const router = new Router()

router.get('/horas', (context) => {
	context.response.body = 'ok'
})
export { router }