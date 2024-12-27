const express=require("express");

const app=express();

app.get("/user",(req,res,next)=>{
    console.log("1st route");
    next();
    //res.send("Response !");
},
 (req,res,next)=>{
    console.log("2nd route");
    //res.send("2nd Response");
    next();
 },
 (req,res,next)=>{
    console.log("3rd route");
    //res.send("3rd Response");
    next();
 },
 (req,res,next)=>{
    console.log("4nd route");
    res.send("4th Response");
    // next();
 });



app.listen(3000,()=>{
    console.log("server is listening on port 3000");
});