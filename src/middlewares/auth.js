const adminAuth=(req,res,next)=>{
    console.log("admin auth is checked");
    const pass="abc";
    const ispass=pass=="abc";
    if(!ispass){
        res.status(401).send("unauthorized user");
    }
    else{
        next();
    }

};

const userAuth=(req,res,next)=>{
    console.log("user auth is checked");
    const pass="abc";
    const ispass=pass=="abc";
    if(!ispass){
        res.status(401).send("unauthorized user");
    }
    else{
        next();
    }

};

module.exports={
    adminAuth,userAuth
} ;