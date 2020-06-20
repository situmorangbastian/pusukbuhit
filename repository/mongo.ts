import { config } from "https://deno.land/x/dotenv/mod.ts"
import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

const env = config()

const mongo = new MongoClient();
mongo.connectWithUri("mongodb://"+env.MONGO_HOSTNAME_PORT);

const db = mongo.database("pusukbuhit");
const nodeCollection = db.collection("node");

export { nodeCollection }