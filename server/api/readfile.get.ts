import fs from "fs";
import path from "path";
import { sendStream } from 'h3'

export default defineEventHandler(async (event) => {
    const queryObject = getQuery(event)
    const file = queryObject.file?.toString() as string
    
    return sendStream(event, fs.createReadStream(path.join("content", file)))
})