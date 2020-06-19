import vs from "https://deno.land/x/value_schema/mod.ts"

interface GenealogyRoot{
    name: string
}

interface GenealogyChiild{
    rootID: string
    name: string
}

const ErrNotFound = "not found"
const ErrInternalServer = "internal server error"
const ErrDuplicate = "data already exists"

const Validator = vs

const SchemaMapValidator = {
    name: Validator.string(),
}

export{
    Validator,
    SchemaMapValidator,
    ErrNotFound,
    ErrDuplicate,
    ErrInternalServer,
    GenealogyRoot,
    GenealogyChiild,
}