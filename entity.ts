import vs from "https://deno.land/x/value_schema/mod.ts"

const ErrNotFound = "not found"
const ErrInternalServer = "internal server error"

const Validator = vs

const NodeValidator = {
    name: Validator.string(),
}

export interface Node{
    id: string
    name: string
    parent: string
}


export{
    Validator,
    NodeValidator,
    ErrNotFound,
    ErrInternalServer,
}
