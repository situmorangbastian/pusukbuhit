import { Root } from "./entity.ts"
import { storeRootRepo, fetchRootRepo } from './repository/root.ts'

const fetchRoot = async (keyword: string) => {
    const result = await fetchRootRepo(keyword)
    return result
}

const storeRoot = async (root: Root) => {
    const result = await storeRootRepo(root)
    return result
}

export{
    fetchRoot,
    storeRoot
}