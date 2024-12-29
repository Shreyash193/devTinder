const express=require("express");
const {connectDB}=require("./config/database");
const app=express();
const User=require('./models/user');

app.use(express.json()); 

app.post("/signup",async (req,res)=>{
  //console.log(req.body);
  // const userObj={
  //     firstName:"Shreyash",
  //     lastName:"Gore",
  //     emailId:"shreyashgore193@gmail.com",
  //     password:"Gore@123"
  // }
  //creating a new instance of user model
  const user=new User(req.body);
  
  try{
    await user.save();
    res.send("user added successfully");
  }
  catch(err){
    res.status(400).send("error in saving data");
  }
});

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







