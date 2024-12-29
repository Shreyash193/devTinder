const  mongoose=require("mongoose");

const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://shreyashgore193:lW76vmAjs9Nj6FFd@namastenode.ajvaj.mongodb.net/devTinder");
};

module.exports={
    connectDB
};
