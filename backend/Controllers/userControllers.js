import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js';
import generateToken from '../utils/generateJWT.js';

///* @desc Auth user/set token 
//// route => POST/api/users/auth
///? @access Public
const Auth = asyncHandler(async (req, res) => {
const {email,password} = req.body; 
const user = await User.findOne({email});
    
    if (user && (await user.matchPassword(password)) ) {

        generateToken(res, user._id);
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            photo:user.photo,
        });
    } else {
        res.status(401);
        throw Error(`Invalid email or password `);
    }
});

///* @desc Register new user
//// route => POST/api/users
///? @access Public
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, phone, password } = req.body;


    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw Error("User Already exists,Try with another email");
    }

    const createdUser = await User.create({
        name, email, phone, password
    });

    if (createdUser) {

        generateToken(res, createdUser._id);
        res.status(201).json({
            id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            phone: createdUser.phone,
            photo:createdUser.photo,
        });
    } else {
        res.status(404);
        throw Error(`Invalid User data `)
    }




});




///* @desc Logout user
//// route => POST/api/users/logout
///? @access private
const logoutUser = asyncHandler(async (req, res) => {

    res.cookie("jwt",'',{
        httpOnly:true,
        expires:new Date(0),
    })
    res.status(200).json({
        message: " user Logged Out successfully"
    });
});

///* @desc Get user Profile
//// route => GET/api/users/profile
///? @access private
const getUserProfile = asyncHandler(async (req, res) => {
  const {name,email,phone,photo} = req.user;
    res.status(200).json({name,email,phone,photo});
});

///* @desc Update User profile
//// route => PUT/api/users/profile
///? @access private
const updateUserProfile = asyncHandler(async (req, res) => {


    const user = await User.findById(req.user._id);
    if(user){

        user.name = req.body.name||user.name;
        user.email = req.body.email||user.email;
        user.phone = req.body.phone||user.phone;
        user.photo = req.body.photo || user.photo;
        if(req.body.password){
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
           _id: updatedUser._id,
           name: updatedUser.name,
           phone: updatedUser.phone,
           email: updatedUser.email,
           photo:updatedUser.photo,

        })


    }else{
        res.status(404);
        throw new Error(`User Not found`);
    }


   
});

export {
    Auth,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
}