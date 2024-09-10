import mongoose from "mongoose"


const connectDB = async (req,res)=>{
const mongo_uri = process.env.MONGO_URI
console.log(mongo_uri)
  try { 
    await mongoose.connect(mongo_uri)
    console.log("MongoDB Atlas Connected")
  } catch (error) {
    console.log(error.stack)
    res.status(500).send("Error connecting to database")
  }
}

export default connectDB