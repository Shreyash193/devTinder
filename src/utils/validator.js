const validator=require("validator");

const signupValidator=(req)=>{
    const { firstName, lastName, emailId,password}=req.body;

    if(!firstName || !lastName){
        throw new Error("Name is invalid");
    }
    else if(firstName.length<4 || firstName.length>40){
        throw new Error("firstName lenght should be 4-40 characters");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("please enter correct emailId");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("please enter strong password");
    }
   
}

const validateEditProfileData=(req)=>{
    const allowedEditFields=["firstName","lastName","emailId","photo","gender","age","about","skills"];

    const isEditAllowed=Object.keys(req.body).every((field)=>allowedEditFields.includes(field)
);
    return isEditAllowed;
}

module.exports={
    signupValidator,validateEditProfileData
}