var mongoose=require("mongoose");
// mongoose.set('strictQuery', false);
mongoose.connect("mongodb://0.0.0.0:27017/inventorymanage",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((e)=>{
    console.log("connected to DateBase....");
}).catch((e)=>{
     console.log("error something went wrong .....pls check the connections..."+e);
});
