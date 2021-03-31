import { Node } from "./entity.ts"
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
    return await getNodeRepo(id)
}

const storeNode = async (node: Node) => {
    return await storeNodeRepo(node)
}

export{
    fetchNode,
    storeNode,
    getNode
}
