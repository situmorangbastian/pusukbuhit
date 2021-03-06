import { Status } from "https://deno.land/std/http/http_status.ts"

import { Router } from 'https://deno.land/x/oak@v6.5.0/mod.ts'
import { Context } from 'https://deno.land/x/oak@v6.5.0/context.ts';
import { getQuery } from 'https://deno.land/x/oak@v6.5.0/helpers.ts';

import { storeNode, fetchNode, getNode } from './usecase.ts'
import { 
	Node,
	Validator,
	NodeValidator,
	ErrInternalServer,
    ErrNotFound,
} from "./entity.ts"

const fetchNodeHandler = async (ctx: Context) => {
    const keyword = ctx.request.url.searchParams.get("keyword") || ""
    
    await fetchNode(keyword).then(function(value){
        ctx.response.body = value
        ctx.response.status = Status.OK
        return
    }).catch(function(e){
        ctx.response.body = e
        switch(e) { 
            case ErrInternalServer:{ 
                ctx.response.status = Status.InternalServerError
                return
            }
        }
    })
}

const getNodeHandler = async (ctx: Context) => {
    const params = getQuery(ctx, { mergeParams: true });
    const result = await getNode(params.id)
    ctx.response.body = result
    if (result.error !== undefined){
        switch(result.error) {
            case ErrNotFound:{
                ctx.response.status = Status.NotFound
                return
            } 
            case ErrInternalServer:{ 
                ctx.response.status = Status.InternalServerError
                return
            }
        }
    }
    
    ctx.response.status = Status.OK
}

const storeNodeHandler = async (ctx: Context) => {
    const body = ctx.request.body();
    if (body.type !== "json") {
        ctx.response.status = Status.BadRequest
        ctx.response.body = {
            "message": "body is must content type application/json"
        }
        return
    }

    const value = await body.value;
    const node: Node = {
        id: value.id,
        name: value.name,
        parent: value.parent,
    }

    try {
        Validator.applySchemaObject(NodeValidator, node, (e) => {
            const key = e.keyStack.shift()
            if(key !== undefined) {
                ctx.response.body = { error:"invalid "+key }
                ctx.response.status = Status.BadRequest
                throw(ctx.response)
            } 
        })
    } catch (response) {
       return
    }

    const result = await storeNode(node)
    ctx.response.body = result
    switch(result.error) { 
        case ErrInternalServer:{ 
            ctx.response.status = Status.InternalServerError
            return
        }
    }
    ctx.response.status = Status.Created
}

const router = new Router()

router.get('/health', (context) => {
	context.response.body = 'ok'
    context.response.status = Status.OK
})
router.get('/node', fetchNodeHandler)
router.get('/node/:id', getNodeHandler)
router.post('/node', storeNodeHandler)

export { router }
