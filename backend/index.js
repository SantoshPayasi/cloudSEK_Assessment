import { app } from "./src/app.js";
import connectDB from "./src/config/db.config.js";
import { envProvider } from "./src/constants.js";

connectDB().then(()=>{
    app.listen(envProvider.PORT, ()=>{
        console.log(`server is running at port ${envProvider.PORT}`)
    })
})