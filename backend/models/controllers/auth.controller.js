const userModel= require("../user.model");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");

const tokenBlacklistModel= require("../blacklist.model");



async function registerUserController(req,res){
    const {username,email,password}= req.body;
    if(!username || !email || !password){
        return res.status(400).json({message: "All fields are required"});
    }   
    const isUserAlreadyExist= await userModel.findOne({
        $or:[
            {username},
            {email}]

    });
    if(isUserAlreadyExist){
        return res.status(400).json({message: "User already exists"});  }

    const hashedPassword= await bcrypt.hash(password,10);
    const user= await userModel.create({
        username,
        email,
        password: hashedPassword
    });

    const token= jwt.sign({id: user._id,username:user.username}, process.env.JWT_SECRET, {expiresIn: "1d"});
     res.cookie("token", token)
     res.status(201).json({message: "User registered successfully", token});






    }



async function loginUserController(req,res){

const {email,password}= req.body;
const user= await userModel.findOne({email});
if(!user){
    return res.status(400).json({message: "Invalid email or password"});

    const isPasswordValid= await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({message: "Invalid email or password"});
    }

    const token= jwt.sign({id: user._id,username:user.username}, process.env.JWT_SECRET, {expiresIn: "1d"});
    res.cookie("token", token)
    res.status(200).json({message: "User logged in successfully", token});





}






async function logoutUserController(req,res){
    const token= req.cookies.token;
    if(token){
        await tokenBlacklistModel.create({token});
    }
    res.clearCookie("token");
    res.status(200).json({message: "User logged out successfully"});




async function getMeController(req,res){
    const user= await userModel.findById(req.user.id).select("-password");
    res.status(200).json({user:{
        id: user._id,
        username: user.username,
        email: user.email
    }});






        module.exports= {
    registerUserController,loginUserController,logoutUserController,getMeController
}};