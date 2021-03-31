import { v4 } from "https://deno.land/std/uuid/mod.ts"

import { 
    Node, 
    ErrInternalServer,
    ErrNotFound,
} from "../entity.ts"
import { nodeCollection } from "./mongo.ts"

const fetchNodeRepo = async ({parent, keyword}:{parent: string, keyword: string}) => {
    try {
        let filter = {}
        if (keyword != ""){
            filter = {
                name: {
                    $regex: keyword,
                    $options: 'i'
                }
            }
        }

        if (parent != ""){
            filter = {
                parent: parent
            }
        }

        const data = await nodeCollection.find(filter).toArray();
        let result: any = new Array(data.length)
        for (var i = 0; i < data.length; i++) {
            result[i] = {
                id: data[i]._id,
                name: data[i].name,
            }
        }
        return result
    } catch (e) {
        console.log(e)
        return {
            error: ErrInternalServer
        }
    }
}

const getNodeRepo = async (id: string) => {
    try {
        const filter = {
            _id: id
        }
        const data = await nodeCollection.findOne(filter)
        if (data == null){
            return {
                error: ErrNotFound
            }
        }

        const filterChild = {
            keyword:"",
            parent:id,
        }

        const dataChilds = await fetchNodeRepo(filterChild)
        if (dataChilds.length == 0){
            var childs: Node[] = [];
            return {
                id: data._id.$oid,
                name:data.name,
                childs:childs
            }
        }

        return {
            id: data._id.$oid,
            name:data.name,
            childs:dataChilds
        }
    } catch (e) {
        console.log(e)
        return {
            error: ErrInternalServer
        }
    }
}

const storeNodeRepo = async (node: Node) => {
    try {
        const id = v4.generate()
        await nodeCollection.insertOne({
            _id: id,
            name: node.name,
            parent: node.parent,
            created_at: new Date(),
            updated_at: new Date(),
        });

        return {
            id: id,
            name: node.name
        }  
    } catch (e) {
        console.log(e)
        return {
            error: ErrInternalServer
        }
    }
}

export {
    storeNodeRepo,
    fetchNodeRepo,
    getNodeRepo
}
