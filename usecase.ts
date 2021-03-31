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
    let result = await getNodeRepo(id)
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
