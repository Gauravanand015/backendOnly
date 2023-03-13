const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    age:Number,
    pass:String,
    role:{
        type:String,
        enum:["seller","user"],
        default:"user"
    }
})

const UserModel = mongoose.model("user",userSchema)


module.exports={
    UserModel
}