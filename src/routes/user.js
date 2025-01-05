const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middlewares/auth");
const ConnectionRequest=require("../models/connectionRequest")

userRouter.get("/user/request/received",userAuth,async (req,res)=>{
     try{
        const loogedInUser=req.user;

        const connectionRequests=await ConnectionRequest.find({
           toUserId:loogedInUser._id,
           status:"interested",
        }).populate("fromUserId",["firstName","lastName"]);

        res.json({
            message:"data fetched successfully",
            data:connectionRequests,
        })
     }
     catch(err){
        res.status(400).send({message : err.message})
     }

});


module.exports=userRouter;