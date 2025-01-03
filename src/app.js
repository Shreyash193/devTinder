const express=require("express");
const {connectDB}=require("./config/database");
const app=express();
const User=require('./models/user');
const {signupValidator}=require("./utils/validator");
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const {userAuth}=require("./middlewares/auth");
//const user = require("../models/user");


app.use(express.json()); 
app.use(cookieParser());

app.post("/signup",async (req,res)=>{
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
    await user.save();
    res.send("user added successfully");
  }
  catch(err){
    res.status(400).send("ERROR : "+ err.message);
  }
});

app.post("/login",async (req,res)=>{
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
      res.send("login successfull!!")
    }
    else{
      res.status(400).send("invalid crediantials");
    }

  }
  catch(err){
    res.status(400).send("ERROR : "+ err.message);
  }
  
});

app.get("/profile",userAuth,async (req,res)=>{

 try{
  const user=req.user;
  res.send(user);
 }
 catch(err){
  res.status(400).send("ERROR : "+ err.message);
}
    
});

app.post("/sendConnectionRequest",userAuth,async (req,res)=>{
  try{
    const user=req.user;
    console.log("connection request sending");

    res.send(user.firstName  + " send connection request");
  }
  catch(err){
    res.status(400).send("ERROR : "+ err.message);
  }
})

connectDB() 
   .then(()=>{
   console.log("database connected ");
   app.listen(3000,()=>{
    console.log("server is listening on port 3000");
});
})
.catch((err) => {
  console.error("database cannot be connected");
});







