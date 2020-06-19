import { config } from "https://deno.land/x/dotenv/mod.ts"
import { Database } from 'https://deno.land/x/denodb/mod.ts'

const env = config()

const mongo = new Database('mongo', {
    uri: 'mongodb://'+env.MONGO_HOSTNAME_PORT,
    database: env.MONGO_DB,
})

export default mongo