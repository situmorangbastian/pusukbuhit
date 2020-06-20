import { v4 } from "https://deno.land/std/uuid/mod.ts"

import { 
    Node, 
    ErrInternalServer, 
} from "../entity.ts"
import { nodeCollection } from "./mongo.ts"

const fetchNodeRepo = async (keyword: string) => {
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
        const data = await nodeCollection.find(filter);
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

const storeNodeRepo = async (node: Node) => {
    try {
        await nodeCollection.insertOne({
            _id: v4.generate(),
            name: node.name,
            created_at: new Date(),
            updated_at: new Date(),
        });

        return {
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
    fetchNodeRepo
}