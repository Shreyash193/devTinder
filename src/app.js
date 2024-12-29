const express=require("express");
const {connectDB}=require("./config/database");
const app=express();
const User=require('./models/user');


app.post("/signup",async (req,res)=>{
  // const userObj={
  //     firstName:"Shreyash",
  //     lastName:"Gore",
  //     emailId:"shreyashgore193@gmail.com",
  //     password:"Gore@123"
  // }
  //creating a new instance of user model
  const user=new User({
    firstName:"Samarth",
    lastName:"Madale",
    emailId:"samarthm@gmail.com",
    password:"Madale@123"
});
  
  try{
    await user.save();
    res.send("user added successfully");
  }
  catch(err){
    res.status(400).send("error in saving data");
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







