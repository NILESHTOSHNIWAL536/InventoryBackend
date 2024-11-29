var express=require("express");
var app=express();
require("../connect/conn.js");

var admin=require("../schema/Registration/admin.js");
var product=require("../schema/product/productItem.js");
const user = require("../schema/Registration/user.js");


app.use(express.json());


app.get("/",(req,res)=>{
    console.log("sad");
    res.send("asdfsdf");
})


app.get("/admin/display/:userid",async(req,res)=>{
    console.log(req.params);
    try{
         var {userid}=req.params;
         var data=await product.find({user_id:userid});
         res.send(data);
    }catch(e){
       console.log("error while getting data => "+e)

    }

});

var addData=async()=>
{
     try{
         var data=new admin({
            shop_name:"nile kiran store",
            shop_address:"mubarak nager kote",
            district:"nizamabad",
            ratings:5, 
            admin_name:"soluchana Toshniwal",
            contactNo1:9849334342,
            contactNo2:8374964342,
            emailadress:"lala@gmail.com",
            password:"[apa@123",
         });

         var getdata=await data.save();
         var id=getdata._id;
         var item=new product({
            user_id:id,
            type:"kirana",
         });
         var pro=await item.save(); 
         console.log(getdata);
         console.log(pro);
     }catch(e){
         console.log("error in adding");
         console.log(e);
     }
};



var addItem=async(id)=>
{
     try{
         var data=await product.find({user_id:id});
         data=data[0];
         var   item={
                ProductName:"soap",
                Price:45,
                QautityAvailable:234,
         };
         data.items.push(item);
         var s=await product.findOneAndUpdate({user_id:data.user_id},{items:data.items},{
              new:true
         });
         console.log(s);
    }catch(e){
        console.log("getting item error "+e);
    }  
}



app.post("/admin",async(req,res)=>{
      console.log("post admin");
      console.log(req.body);
       try{
            var adminuser=new admin(req.body);
            var getdata=await adminuser.save();
            var id=getdata._id;
            var item=new product({
               user_id:id,
               type:"kirana",
            });
            var pro=await item.save();
            res.send(getdata);
       }catch(e){
          console.log(e);
           res.send("error an able to add data")
       }
});

app.post("/user",async(req,res)=>{
      console.log("post user");
      console.log(req.body);
       try{
            var enduser=new user(req.body);
            var getdata=await enduser.save();
            res.send(getdata);
       }catch(e){
          console.log(e);
           res.send("error an able to add data")
       }
});

app.get("/admin/:id/:pass",async(req,res)=>{
      console.log("get admin with email and password");
       try{
        var {id}=req.params;
        var {pass}=req.params;
            var getuser=await admin.find({emailadress:id,password:pass});
            console.log(getuser);
            res.send(getuser);
       }catch(e){
          console.log(e);
           res.send("error an able to add data ")
       }
});

app.get("/user/:id/:pass",async(req,res)=>{
      console.log("get user with email and password");
       try{
        var {id}=req.params;
        var {pass}=req.params;
            var getuser=await user.find({emailadress:id,password:pass});
            console.log(getuser);
            res.send(getuser);
       }catch(e){
          console.log(e);
           res.send("error an able to add data ")
       }
});


app.post("/additem/:id",async(req,res)=>{
    console.log("additem called");
    try{
        var {id}=req.params;
        var data=await product.find({user_id:id});
        var arr=data[0].items;
        arr.push(req.body);
        console.log(data);
        var pro=await product.findOneAndUpdate({user_id:id},{items:arr},{new:true})
        res.send(pro);
    }catch(e){
        res.send("error while adding item");
    }
});




app.get("/user/shops",async(req,res)=>{
       try{
            var data=await admin.find();
            console.log(data.length);
            res.send(data);
       }catch(e){
          console.log("error while getting shops => "+e)
       }
});

app.delete("/admin/:userid/:itemid",async(req,res)=>{
    try{
        var {userid}=req.params;
        var {itemid}=req.params;
        var getuserdata=await product.find({user_id:userid});
        getuserdata=getuserdata[0];
        var item=getuserdata.items.filter((i)=>i._id!=itemid);
        console.log(item);
        var filterdata=await product.findOneAndUpdate({user_id:userid},{items:item},{new:true});
        console.log(filterdata);
        res.send(item);
    }catch(e)
    {
        console.log(e);
      res.send("error while deleting the item"+e);
    }
});

app.patch("/admin/:userid/:itemid",async(req,res)=>{
    try{
        var {userid}=req.params;
        var {itemid}=req.params;
        var body=req.body;
        var getuserdata=await product.find({user_id:userid});
        getuserdata=getuserdata[0];
        var item=getuserdata.items.filter((i)=>i._id!=itemid);
        item.push(body);
        var updatedData=await product.findOneAndUpdate({user_id:userid},{items:item},{new:true});
        console.log(updatedData);
        res.send("updated item "+updatedData);
    }catch(e)
    {
        console.log(e);
      res.send("error while updateing the item"+e);
    }
});

app.listen("8000",()=>{
      console.log("listing to port no 8000");
})