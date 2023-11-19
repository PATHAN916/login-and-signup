const express=require("express");
const mongoose=require("mongoose");
const multer=require("multer")
const cors=require("cors");



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })


let app=express();
app.use(cors());

connectToMdb=async()=>{
    try{
        await  mongoose.connect("mongodb+srv://rahamanpathan916:rahaman@cluster0.e3wo8ps.mongodb.net/poster?retryWrites=true&w=majority");
        console.log("successfully connected database")
    }catch(err){
        console.log(" not successfully connected database")
    }
}

let userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
let User=new mongoose.model("user",userSchema);




app.post("/login", upload.none(),async(req,res)=>{
    let userDetails=await User.find().and({email:req.body.email})
    if(userDetails.length==0){
        res.json({status:"failures",msg:"user doesnot exits"})
    }if(userDetails[0].password==req.body.password){
        res.json({status:"success",msg:"validate sucess"})
    }else{
        res.json({status:"failures",msg:"incorrect password"})
    }
})

app.post("/signup",upload.none(),async(req,res)=>{
let userDetails= await User.find().and({email:req.body.email})
if(userDetails.length>0){
    res.json({status:"failure",msg:" user already exists"});
}else{

    try{
        let userDetails=new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        
        });
  User.insertMany([userDetails]);
  console.log(req.body)
  res.json({status:"success",msg:" user created successfully"});
        
    }catch(err){
     res.json({status:"failure",msg:"user not created successfully"});
    }


}});

app.listen(1234,()=>{
    console.log("listening to port 1234")
})

connectToMdb();