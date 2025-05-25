const schema = require("../model/schema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

module.exports.register=async(req,res)=>{
    console.log(req.body)

    let user = await schema.findOne({email: req.body.email})

    if(user){
        return res.status(200).json({msg:"User already existed!"})
    }
    req.body.password = await bcrypt.hash(req.body.password,10)

    await schema.create(req.body).then((data)=>{
        return res.status(200).json({msg:"User already existed!",user:data})
    })
}

module.exports.login=async(req,res)=>{
    console.log(req.body)

    let admin = await schema.findOne({email: req.body.email});

    if(!admin){
        return res.status(200).json({msg : "Admin Not Found !",code : 100})
    }

    if(await bcrypt.compare(req.body.password,admin.password)){
        const token = jwt.sign({admin},"rnw",{expiresIn : "1h"})
          return res.status(200).json({ msg: "Admin Logged In Successfully !", code: 200,token : token });
  }else{
    return res.status(200).json({ msg: "Admin password is wrong !", code: 102 });
  }
}