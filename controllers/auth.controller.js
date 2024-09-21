const UserModel=require("../models/User.Model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const signupController=async(req,res,next)=>{
    try{
        const{userName,email,password}=req.body
        console.log(req.body)
        if(!userName||!email||!password){
            return res.status(404).json({error:"Invalid credentials"})
        }
        if(password<6){
            return res.status(500).json({error:"password should be 6 character and above"})
           }
const hassedPassword=bcrypt.hashSync(password,8)
const user=await UserModel.create({
    userName,
    email,
    password:hassedPassword
})
const token=jwt.sign({userId:user._id},process.env.JWT_KEY)
user.password=null
return res.status(200).cookie("token",token).json({msg:"account created successfully"})

    }
    catch(err){
        console.log("error from signupController",err.message)
        return res.status(500).json({error:"Internal server Error"})
    }
}
const loginController=async(req,res)=>{
    try{
        const{userName,email,password}=req.body
        const user=await UserModel.findOne({userName})
        const isPasswordMatch=bcrypt.compareSync(password,user.password)
        if(!user||!isPasswordMatch)return res.json("Invalid credentials")
        const token=jwt.sign({userId:user._id},process.env.JWT_KEY)
        user.password=null
        return res.status(200).cookie("token",token).json({msg:"account loggedin successfully "})
        }
        catch(err){
            console.log(err.message)
            return res.status(500).json({error:"Internal server Error"})
        }
     }


}