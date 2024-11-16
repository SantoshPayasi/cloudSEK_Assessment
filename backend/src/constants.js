import dotenv from "dotenv"
dotenv.config()




 const corsOptions = {
    origin : "http://localhost:3000",
    credentials :true 
}


export const adminTypes = {
    Admin:"admin",
    SubAdmin:"user"
}







 const envProvider = {
    DBURI : process.env.DB_URI,
    PORT : process.env.PORT
}



export {corsOptions, envProvider}

