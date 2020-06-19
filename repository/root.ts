import { v4 } from "https://deno.land/std/uuid/mod.ts"

import { 
    Root, 
    ErrInternalServer, 
} from "../entity.ts"
import { RootModel } from "../repository/model.ts"

const storeRootRepo = async (root: Root) => {
    try {
        await RootModel.create({
            _id:  v4.generate(),
            name: root.name,
        })

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
    storeRootRepo
}