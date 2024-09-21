const {signupController,loginController,logoutController,accountDeleteController}=require("../controllers/auth.controller")
const protectRoute=require("../middleware/protectRoute")
const router=require("express").Router()
router.post("/signup",signupController)
router.post("/login",loginController)
router.post("/logout",logoutController)
router.post("/delete",protectRoute,accountDeleteController)
module.exports=router