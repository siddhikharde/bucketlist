import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import BucketList from "./models/BucketList.js"
dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());
const PORT =process.env.PORT;

app.get("/health",(req,res)=>{
    res.send({
        msg:"server is healthy"});
})

app.post("/bucketlist", async (req, res)=>{
  const {name, description, priority}=req.body;
  if(!name){
    res.json({
      success:false,
      msg:"Name is required."
    })
  }
  const newBucketList=new BucketList({
    name,
    description,
    priority
  })

  try{
    const savedBucketList=await newBucketList.save();
    return res.json({
    success:true,
    msg:"Saved Succesfully",
    data:savedBucketList,
    })
  }
  catch(e){

    return res.json({
     success:false,
     msg:"faild to save data",
     error:e.message,
  })
  }
  
});

app.patch("/bucketlist/:id/complete", async(req, res) => {
  const {id}=req.params;
 try{
   const updateBucketList=await BucketList.updateOne({_id:id},{$set:{isCompleted:true}});
  const updatedData=await BucketList.findOne({_id:id});
  res.json({
    succes:true,
    msg:"updated succesfully",
    data:updatedData
  })
 }catch(e){
   res.json({
    success:false,
    msg:"faild to update"
   })
 }
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