import { config } from "https://deno.land/x/dotenv/mod.ts"
import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

const env = config()

const mongo = new MongoClient();
mongo.connectWithUri(env.MONGO_HOST);

const db = mongo.database(env.MONGO_DB);
const nodeCollection = db.collection("node");

export { nodeCollection }