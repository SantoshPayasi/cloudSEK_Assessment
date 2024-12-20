import mongoose from "mongoose"
import { envProvider } from "../constants.js"

// To monitor the status of the mongo connection

mongoose.connection.on('connecting', () => {
    console.log('db connecting, Status:', mongoose.connection.readyState); //logs 2
});
mongoose.connection.on('connected', () => {
    console.log('db connected, Status:', mongoose.connection.readyState); //logs 1
});
mongoose.connection.on('disconnecting', () => {
    console.log('db disconnecting, Status:', mongoose.connection.readyState); // logs 3
});
mongoose.connection.on('disconnected', () => {
    console.log('db disconnected, Status:', mongoose.connection.readyState); //logs 0
});


const connectDB = async() => {
   try {
      const db = await mongoose.connect(envProvider.DBURI, {
        dbName:"cloudSEK"
      })
      return db
   } catch (error) {
      throw new Error(error)
   }
}

export default connectDB