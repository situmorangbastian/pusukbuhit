import vs from "https://deno.land/x/value_schema/mod.ts"

interface Root{
    id: string
    name: string
}

interface Child{
    id: string
    rootId: string
    name: string
}

const ErrNotFound = "not found"
const ErrInternalServer = "internal server error"
const ErrDuplicate = "data already exists"

const Validator = vs

const RootValidator = {
    name: Validator.string(),
}

export{
    Validator,
    RootValidator,
    ErrNotFound,
    ErrDuplicate,
    ErrInternalServer,
    Root,
    Child,
}