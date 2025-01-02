const jwt=require("jsonwebtoken");
const User=require("../models/user");

const userAuth = async (req,res,next)=>{
    try{
        //select a token
        const cookie=req.cookies;

        const {token}=cookie;
        if(!token){
            throw new Error("invalid token");
        }

        //validate a token
        const decodeObj=await jwt.verify(token,"DEV@Tinder$123");

        const {_id}=decodeObj;

        const user=await User.findById(_id);
        if(!user){
            throw new Error("user not found");
        }

        req.user=user;
        next();
    }
    catch(err){
        res.status(400).send("ERROR " + err.message);
    }

};

module.exports={
    userAuth
} ;