import { config } from "https://deno.land/x/dotenv/mod.ts"
import { MongoClient } from "https://deno.land/x/mongo@v0.22.0/mod.ts";

const env = config()

const mongo = new MongoClient();
await mongo.connect("mongodb://localhost:27017");

// Defining schema interface
interface NodeSchema {
    _id: { $oid: string };
    name: string
    parent: string
}

const db = mongo.database(env.MONGO_DB);
const nodeCollection = db.collection<NodeSchema>("node");

export { nodeCollection }
