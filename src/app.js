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
const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");



app.use(express.json()); 
app.use(cookieParser());

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);











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







