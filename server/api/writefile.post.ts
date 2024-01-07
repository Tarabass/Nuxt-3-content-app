import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const queryObject = getQuery(event)
    const file = queryObject.file?.toString() as string

    fs.writeFile(path.join('content', file), body, err => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });

    return 'ok'
})