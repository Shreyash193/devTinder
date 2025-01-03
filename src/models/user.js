const  mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid Email id "+ value);
            }
        }
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    photo:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    about:{
        type:String,
        default:"This is default about of user"
    },
    skills:{
        type:[String]
    },

},
{
    timestamps:true, 
},
);

userSchema.methods.getJWT=async function(){
    const user=this;

    const token=await jwt.sign({_id:user._id},"DEV@Tinder$123",{expiresIn:"1d"});

    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user=this;
    const passwordHash=user.password;

    const isPasswordValid=await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    )

    return isPasswordValid;
};

module.exports =mongoose.model("User",userSchema);





