const express=require("express");

const app=express();





app.get("/user",(req,res)=>{
    res.send("get api call ");
});

app.post("/user",(req,res)=>{
    res.send({firstName:"Shreyash",lastName:"Gore"});
});

app.delete("/user",(req,res)=>{
    res.send("delete api call ");
});
app.use("/user",(req,res)=>{
    res.send("Hello hello hello ");
});



app.listen(3000,()=>{
    console.log("server is listening on port 3000");
});