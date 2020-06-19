import { Status } from "https://deno.land/std/http/http_status.ts"

import { Router } from 'https://deno.land/x/oak@v4.0.0/mod.ts'
import { Request, Response } from 'https://deno.land/x/oak@v4.0.0/mod.ts'

import { storeRoot } from './usecase.ts'
import { 
	Root,
	Validator,
	SchemaMapValidator,
	ErrInternalServer,
} from "./entity.ts"

const storeRootHandler = async ({ request, response }: { request: Request, response: Response }) => {
    const body = await request.body()
    const root: Root = body.value

    try {
        Validator.applySchemaObject(SchemaMapValidator, root, (e) => {
            const key = e.keyStack.shift()
            if(key !== undefined) {
                response.body = { error:"invalid "+key }
                response.status = Status.BadRequest.valueOf()
                throw(response)
            } 
        })
    } catch (response) {
       return
    }

    const result = await storeRoot(root)
    response.body = result
    switch(result.error) { 
        case ErrInternalServer:{ 
            response.status = Status.InternalServerError.valueOf()
            return
        }
    }
    response.status = Status.Created.valueOf()
}

const router = new Router()

router.get('/horas', (context) => {
	context.response.body = 'ok'
})
router.post('/root', storeRootHandler)

export { router }