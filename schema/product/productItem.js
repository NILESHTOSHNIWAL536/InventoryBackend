var mongoose=require("mongoose");

var product=new mongoose.Schema(
    {
        user_id:String,
        type:String,
        items:[
              {
                ProductName:String,
                Price:Number,
                QautityAvailable:Number,
                Discriptions :String
              }
        ],
        date:{
             type:String,
             default:Date.now(),
        }
    }
);

var products=new mongoose.model("product",product);


module.exports=products;