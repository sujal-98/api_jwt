const mongo=require('mongoose')
 const userSchema=new mongo.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongo.model('User',userSchema)