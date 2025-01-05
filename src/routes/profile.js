const express=require("express");
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/auth");
//const { validate } = require("../models/user");
const {validateEditProfileData}=require("../utils/validator");

profileRouter.get("/profile/view",userAuth,async (req,res)=>{

    try{
     const user=req.user;
     res.send(user);
    }
    catch(err){
     res.status(400).send("ERROR : "+ err.message);
   }
       
   });

  profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
     try{
      if(!validateEditProfileData(req)){
        throw new Error("invalid edit request");
      };
      const loggedInUser=req.user;
      
      Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
      
      await loggedInUser.save();

      // res.send(`${loggedInUser.firstName}, your profile was updated successfully`);
      
      //best practice
      res.json({message:`${loggedInUser.firstName}, your profile was updated successfully`,
      data:loggedInUser});
     }
     catch(err){
      res.status(400).send("ERROR :" + err.message);
     }
  })

module.exports=profileRouter;