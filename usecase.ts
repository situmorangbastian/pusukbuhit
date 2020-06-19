import { Root, ErrNotFound } from "./entity.ts"
import { storeRootRepo } from './repository/root.ts'

const storeRoot = async (root: Root) => {
    const result = await storeRootRepo(root)
    return result
}

export{
    storeRoot
}