const express=require("express");
const authRouter=express.Router();
const User=require('../models/user');
const bcrypt=require("bcrypt");
const {signupValidator}=require("../utils/validator");

authRouter.post("/signup",async (req,res)=>{
    try{
    //valiadation a data
    signupValidator(req);
  
    const {firstName,lastName,emailId,password}=req.body;
  
    //encrypting a password
  
    const passwordHash=await bcrypt.hash(password,10);
    console.log(passwordHash);
    
    //creating a new instance of user model
    const user=new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash,
    });
      const savedUser=await user.save();

      const token=await savedUser.getJWT();
        //console.log(token);
        
        //sending cookie back to user/browser
        res.cookie("token",token,{
          expires:new Date(Date.now() + 8 * 3600000),
        });
      res.json({message :"user added successfully", data:savedUser});
    }
    catch(err){
      res.status(400).send("ERROR : "+ err.message);
    }
  });


authRouter.post("/login",async (req,res)=>{
    try{
      const {emailId,password}= req.body;
  
      const user=await User.findOne({emailId:emailId});
      if(!user){
        throw new Error("invalid crediantials");
      }
      
      const isPasswordValid=await user.validatePassword(password);
  
      if(isPasswordValid){
        //create jwt token
        const token=await user.getJWT();
        //console.log(token);
        
        //sending cookie back to user/browser
        res.cookie("token",token,{
          expires:new Date(Date.now() + 8 * 3600000),
        });
        res.send(user);
      }
      else{
        res.status(400).send("invalid crediantials");
      }
  
    }
    catch(err){
      res.status(400).send("ERROR : "+ err.message);
    }
    
  });

authRouter.post("/logout",async (req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    });
    res.send("logout successfull !!");
})

module.exports=authRouter;