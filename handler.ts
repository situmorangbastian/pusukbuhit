import { Status } from "https://deno.land/std/http/http_status.ts"

import { Router } from 'https://deno.land/x/oak@v4.0.0/mod.ts'
import { Request, Response } from 'https://deno.land/x/oak@v4.0.0/mod.ts'

import { storeNode, fetchNode, getNode } from './usecase.ts'
import { 
	Node,
	Validator,
	NodeValidator,
	ErrInternalServer,
    ErrNotFound,
} from "./entity.ts"

const fetchNodeHandler = async ({ request, response }: { request: Request, response: Response }) => {
    const keyword = request.url.searchParams.get("keyword") || ""
    
    const result = await fetchNode(keyword)
    response.body = result
    switch(result.error) { 
        case ErrInternalServer:{ 
            response.status = Status.InternalServerError.valueOf()
            return
        }
    }
    response.status = Status.OK.valueOf()
}

const getNodeHandler = async ({ params, request, response }: { params: {id: string}, request: Request, response: Response }) => {
    const result = await getNode(params.id)
    response.body = result
    switch(result.error) {
        case ErrNotFound:{
            response.status = Status.NotFound.valueOf()
            return
        } 
        case ErrInternalServer:{ 
            response.status = Status.InternalServerError.valueOf()
            return
        }
    }
    response.status = Status.OK.valueOf()
}

const storeNodeHandler = async ({ request, response }: { request: Request, response: Response }) => {
    const body = await request.body()
    const node: Node = body.value

    try {
        Validator.applySchemaObject(NodeValidator, node, (e) => {
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

    const result = await storeNode(node)
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
router.get('/node', fetchNodeHandler)
router.get('/node/:id', getNodeHandler)
router.post('/node', storeNodeHandler)

export { router }