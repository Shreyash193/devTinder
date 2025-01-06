const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middlewares/auth");
const ConnectionRequest=require("../models/connectionRequest")
const User=require("../models/user");

const USER_SAFE_DATA="firstName lastName gender photo age skills";

userRouter.get("/user/request/received",userAuth,async (req,res)=>{
     try{
        const loogedInUser=req.user;

        const connectionRequests=await ConnectionRequest.find({
           toUserId:loogedInUser._id,
           status:"interested",
        }).populate("fromUserId",USER_SAFE_DATA);

        res.json({
            message:"data fetched successfully",
            data:connectionRequests,
        })
     }
     catch(err){
        res.status(400).send({message : err.message})
     }

});

userRouter.get("/user/connections",userAuth,async(req,res)=>{
   try{
      const loggedInUser=req.user;

   const connectionRequests=await ConnectionRequest.find({
      $or:[
         {toUserId:loggedInUser._id,status:"accepted"},
         {fromUserId:loggedInUser._id,status:"accepted"},
      ]
   }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);

   const data=connectionRequests.map((row)=>{
      if(row.fromUserId.toString()==loggedInUser._id.toString()){
         return row.toUserId;
      }
      else{
         return row.fromUserId;
      }
   });

   res.json({data});
   }
   catch(err){
      res.status(400).send({message : err.message})
   }
})

userRouter.get("/user/feed",userAuth,async(req,res)=>{
   try{
      const loggedInUser=req.user;

      const page=parseInt(req.query.page) || 1;
      let limit=parseInt(req.query.limit) || 10;
      limit = limit > 50 ? 50 : limit;
      skip=(page-1)*limit;

      const connectionRequest=await ConnectionRequest.find({
         $or:[
            {fromUserId:loggedInUser._id},
            {toUserId:loggedInUser._id}
         ],
      }).select("fromUserId toUserId");
      
      const hiddenUsersFromFeed=new Set();
      connectionRequest.forEach((req)=>{
         hiddenUsersFromFeed.add(req.toUserId.toString());
         hiddenUsersFromFeed.add(req.fromUserId.toString());
      });

      const users=await User.find({
         $and:[
            {_id:{$nin:Array.from(hiddenUsersFromFeed)}},
            {_id:{$ne:loggedInUser._id}},
         ],
      }).select(USER_SAFE_DATA)
        .skip(skip)
      .limit(limit);

      res.send(users);
   }
   catch(err){
      res.status(400).send({message:err.message});
   }
});


module.exports=userRouter;