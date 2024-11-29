var mongoose=require("mongoose");

var admin_user=new mongoose.Schema({

      shop_name:String,
      shop_address:String,
      district:String,
      ratings:Number, 
      admin_name:String,
      contactNo1:Number,
      contactNo2:Number,
      emailadress:String,
      password:String,

});

var adminUser=new mongoose.model("admin",admin_user);


module.exports=adminUser;