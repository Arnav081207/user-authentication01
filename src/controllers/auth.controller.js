
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from"jsonwebtoken";
import config from "../config/config.js";
import cookieParser from "cookie-parser";

export async function register(req, res) {
    const { username, email, password } = req.body;

    const isAlreadyRegistered = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (isAlreadyRegistered) {
        return res.status(409).json({
            message: "Username or email is already registered"
        });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hashPassword
    });

    
    
    const acesstoken = jwt.sign({
        id:user._id
    }
    ,config.JWT_SECRET,
{
expiresIn:"1h"
}
)
const refreshtoken =jwt.sign({
    id:user._id
},config.JWT_SECRET,{
    expiresIn:"7d"
});
res.cookie("refreshtoken",refreshtoken,{
    httponly:true,
    secure:true,
    samesite:"strict",
    maxage:7*24*60*60*1000
})
res.status(201).json({
        message: "User registered successfully",
        acessstoken:acesstoken,
        refreshtoken:refreshtoken,
        user: {
            username: user.username,
            email: user.email,
            
        }

    })


}
export async function getuser(req, res) {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Token not found"
        });
    }

    const decode = jwt.verify(token, config.JWT_SECRET);
const user= await userModel.findById(decode.id)

    res.status(201).json({
        message:"token get request sucessfully implememted",
        userdata:{
username:user.username,
email:user.email
        }
    })
}
export async function refreshtoken() {
    const refreshtoken= await req.cookie.refreshtoken;
    if(!refreshtoken){
       return res.status(401).json({
            message:"refresh token not found"
        })
    }
    const decode= jwt.verify(refreshtoken,JWT_SECRET);
    const acesstoken=jwt.sign({
        id:decoded.id
    },config.JWT_SECRET,{
        expiresIn:"15m"
    })
    
}