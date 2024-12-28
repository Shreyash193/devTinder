const express=require("express");

const app=express();

const {adminAuth,userAuth}=require("./middlewares/auth");

app.use("/admin",adminAuth);

app.use("/User",userAuth);

app.get("/User/allUserData",(req,res)=>{

    res.send("user data sent");
  
});

app.get("/User/deleteallUserData",(req,res)=>{

    res.send("user data deleted");
  
});

app.get("/admin/getAllData",(req,res)=>{

        res.send("All Data Sent");
      
});

app.get("/admin/deleteUser",(req,res)=>{
     
    res.send("user is deleted");
  
});





app.listen(3000,()=>{
    console.log("server is listening on port 3000");
});