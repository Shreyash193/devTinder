const mongoose=require("mongoose");

const connectionRequestSchema=new mongoose.Schema(
  {
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        required:true,
        emun:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`,
        }
    }
  },
{
    timestamps:true,
}
);

connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;
    //check if the fromuserid is same as touserid

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("cannot send request to yourself");
    }
    next();
});

const ConnectionRequestModel=new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);

module.exports=ConnectionRequestModel;
