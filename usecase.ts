import { Node, ErrNotFound } from "./entity.ts"
import { storeNodeRepo, fetchNodeRepo, getNodeRepo } from './repository/node.ts'

const fetchNode = async (keyword: string) => {
    const filter = {
        parent: "",
        keyword: keyword
    }
    const result = await fetchNodeRepo(filter)
    return result
}

const getNode = async (id: string) => {
    let result = await getNodeRepo(id)
    if (result == null){
        return result = {
            error: ErrNotFound
        }
    }
    if (result.childs.length == 0){
        return result = {
            id:result.id,
            name:result.name
        }
    }
    return result
}

const storeNode = async (node: Node) => {
    const result = await storeNodeRepo(node)
    return result
}

export{
    fetchNode,
    storeNode,
    getNode
}
