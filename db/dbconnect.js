import mongoose from "mongoose";

require('dotenv').config(); 
export default function dbconnect() {
 try {
    mongoose.connect(process.env.MONGO_URI)
    console.log("Mongodb connected");
    
 } catch (error) {
    console.log("Error in Connection");
    
 }
}
