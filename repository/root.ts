import { v4 } from "https://deno.land/std/uuid/mod.ts"

import { 
    Root, 
    ErrInternalServer, 
} from "../entity.ts"
import { rootCollection } from "./mongo.ts"

const fetchRootRepo = async (keyword: string) => {
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
        const data = await rootCollection.find(filter);
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

const storeRootRepo = async (root: Root) => {
    try {
        await rootCollection.insertOne({
            _id: v4.generate(),
            name: root.name,
            created_at: new Date(),
            updated_at: new Date(),
        });

        return {
            name: root.name
        }  
    } catch (e) {
        console.log(e)
        return {
            error: ErrInternalServer
        }
    }
}

export {
    storeRootRepo,
    fetchRootRepo
}