import vs from "https://deno.land/x/value_schema/mod.ts"

interface Node{
    id: string
    name: string
    parent: string
}


const ErrNotFound = "not found"
const ErrInternalServer = "internal server error"
const ErrDuplicate = "data already exists"

const Validator = vs

const NodeValidator = {
    name: Validator.string(),
}

export{
    Validator,
    NodeValidator,
    ErrNotFound,
    ErrDuplicate,
    ErrInternalServer,
    Node,
}