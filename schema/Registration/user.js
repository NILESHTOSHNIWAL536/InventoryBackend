var mongoose=require("mongoose");

var user=new mongoose.Schema(
    {
        username:String,
        home_address:String,
        contactNo:Number,
        emailadress:String,
        password:String,
        district:String,
    }
);

var user=new mongoose.model("user",user);
module.exports=user;