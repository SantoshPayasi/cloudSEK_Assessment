import express, { urlencoded } from "express";
import cors from "cors";

import { errorHandler } from "./utils/errorHandler.utility.js";
import { corsOptions } from "./constants.js";
import mainRouter from "./routes/main.route.js";

// import cookieParser from "cookie-parser";



const app = express()



app.use(express.json({limit:"16kb"}))
app.use(urlencoded({extended:true}))
app.use(cors(corsOptions))



app.use("/api/v1", mainRouter)

// Testing api
app.get("/", (request, response)=>{
    response.status(200).send("APi is working fine")
})

// for middleware error handling
app.use(errorHandler);



export {app}