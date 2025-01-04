const express=require("express");
const requestRouter=express.Router();
const {userAuth}=require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest",userAuth,async (req,res)=>{
    try{
      const user=req.user;
      console.log("connection request sending");
  
      res.send(user.firstName  + " send connection request");
    }
    catch(err){
      res.status(400).send("ERROR : "+ err.message);
    }
  })

module.exports=requestRouter;