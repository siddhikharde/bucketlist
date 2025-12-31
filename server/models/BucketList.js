import {Schema, model} from "mongoose";

const BucketListSchema=new Schema({
    name:{type:String, required:true},
    description:{type:String},
    priority:{type:String, default:0},
    isCompleted:{type:Boolean, default:false}
});

const BicketList=model("BucketList",BucketListSchema);

export default BicketList;