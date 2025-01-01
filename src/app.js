const express=require("express");
const {connectDB}=require("./config/database");
const app=express();
const User=require('./models/user');
const {signupValidator}=require("./utils/validator");
const bcrypt=require("bcrypt");

app.use(express.json()); 

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
    const {emailId,password}=req.body;

    const user=await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("invalid crediantials");
    }
    
    const isPasswordValid=await bcrypt.compare(password,user.password);

    if(isPasswordValid){
      res.send("login successfull!!")
    }
    else{
      res.status(400).send("invalid crediantials");
    }

  }
  catch(err){
    res.status(400).send("ERROR : "+ err.message);
  }
  
})

app.get("/user",async (req,res)=>{
  const userEmail=req.body.emailId;

  try{
    const users=await User.find({emailId:userEmail});
    if(users.length===0){
      res.status(400).send("user not found");
    }
    else{
      res.send(users);
    }
  }
  catch(err){
    res.status(400).send("something went wrong 1");
  }
});

app.get("/feed",async (req,res)=>{
  try{
    const users=await User.find({});
    res.send(users);
  }
  catch{
    res.status(400).send("someting went wrong"); 
  }
})

app.get("/userOne",async (req,res)=>{
  const userEmail=req.body.emailId;
  try{
    const users=await User.findOne({emailId:userEmail});
    if(users.length===0){
      res.status(400).send("user not found");
    }
    else{
      res.send(users);
    }
  }
  catch(err){
    res.send("something went wrong");
  }
});

app.get("/userById",async (req,res)=>{
    const userId=req.body._id;
    try{
      const users=await User.findById(userId);
      if(users.length===0){
        res.status(400).send("user not found");
      }
      else{
        res.send(users);
      }
      
    }
    catch(err){
      res.status(400).send("something went wrong");
    }
    
})

//delete a user from database
app.delete("/user",async(req,res)=>{
  const userId=req.body._id;
  try{
    const users=await User.findByIdAndDelete(userId);
    res.send("user is deleted successfully");
  }
  catch(err){
    res.status(400).send("something went wrong");
  }
});

app.patch("/user/:userId",async (req,res)=>{
  const userId=req.params?.userId;
  const data=req.body;
  console.log(data);
  try{
    const ALLOWED_UPDATES=[
    "photo","gender","about","age","skills"
    ];

    const isUpdateAllowed=Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k));

    if(!isUpdateAllowed){
      throw new Error("update not allowed");
    }
    await User.findByIdAndUpdate({_id:userId},data,{
      runValidators:true
    });
    res.send("user updated successfully");
  }
  catch(err){
    res.status(400).send("update failed + err.message");
  }
  
});

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







