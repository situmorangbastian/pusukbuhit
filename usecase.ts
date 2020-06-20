import { Node } from "./entity.ts"
import { storeNodeRepo, fetchNodeRepo } from './repository/node.ts'

const fetchNode = async (keyword: string) => {
    const result = await fetchNodeRepo(keyword)
    return result
}

const storeNode = async (node: Node) => {
    const result = await storeNodeRepo(node)
    return result
}

export{
    fetchNode,
    storeNode
}