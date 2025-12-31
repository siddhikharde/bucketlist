import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());
const PORT =process.env.PORT;
app.get("/",(req, res)=>{
    res.send({
        msg:"WELCOME TO THE BUCKETLIST",
        status:"true"
    }
        );
})
app.get("/health",(req,res)=>{
    res.send({
        msg:"server is healthy"});
})

const connectDB=async()=>{
  const conn=await mongoose.connect(process.env.MONGO_URI);
  if(conn){
    console.log("Mongodb connected succesfully");
  }
}
app.listen(PORT,()=>{
    console.log(`server is running on Post:${PORT}`);
    connectDB();
})