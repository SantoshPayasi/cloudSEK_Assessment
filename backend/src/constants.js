import dotenv from "dotenv"
dotenv.config()




 const corsOptions = {
    // origin : "https://cloud-sek-assessment-frontend.vercel.app",
    origin:"*"
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

