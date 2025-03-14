import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js';
import {generateAccessToken,generateRefreshToken} from '../utils/generateJWT.js';
import jwt from 'jsonwebtoken'

///* @desc Auth admin/set token 
//// route => POST/api/admin/auth
///? @access Public
const adminAuth = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password) && user.isAdmin)) {
        const  accessToken  = generateAccessToken(user);
        generateRefreshToken(res, user);
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            photo: user.photo,
            accessToken
        });
    } else {
        res.status(401);
        throw new Error(`You are Not an admin `);
    }
});

///* @desc get users collection
//// route => GET/api/admin/getUsers
///? @access private

const getUsers = asyncHandler(async (req, res) => {

    const userCollection = await User.find({ isAdmin: false }).select("-password");

    if (userCollection) {
        res.status(200).json(userCollection);
    } else {
        res.status(404).json({ message: "No users found" })
    }


});


///* @desc Logout admin
//// route => POST/api/admin/logout
///? @access private
const logoutAdmin = asyncHandler(async (req, res) => {

    res.cookie("jwt", '', {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({
        message: " Admin Logged Out successfully"
    });
});


///* @desc Update User Details
//// route => PUT/api/admn/updateUser
///? @access private
const updateUserDetails = asyncHandler(async (req, res) => {


    const user = await User.findById(req.body._id);
    if (user) {

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.photo = req.body.photo || user.photo;

       


        await user.save();

        res.status(200).json({

            message: "User Details Updated"

        })


    } else {
        res.status(404);
        throw new Error(`User Not found`);
    }



});


///* @desc delete User 
//// route => PUT/api/admin/deleteUser
///? @access private
const deleteUser = asyncHandler(async (req, res) => {


    const user = await User.findById(req.body._id);
    if (user) {

        const response = await User.deleteOne({ _id: user._id });

        res.status(200).json({

            message: "User Deleted Successfully"

        })


    } else {
        res.status(404);
        throw new Error(`User Not found`);
    }



});


///* @desc Add new user
//// route => POST/api/admin/addUser
///? @access private
const addUser = asyncHandler(async (req, res) => {

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

      
        res.status(201).json({
        createdUser,
            message:"User Created successfully"
        });
    } else {
        res.status(404);
        throw Error(`Invalid User data `)
    }




});



///* @desc Get admin Refresh
//// route => GET/api/admin/refresh
///? @access public - for  access token when expired
const refreshAdmin = asyncHandler(async (req, res) => {

    const cookies = req.cookies


    if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" })

    const refreshToken = cookies.jwt;
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: "Forbidden " });

            const foundUser = await User.findById({ _id: decoded.userId })

            if (!foundUser) return res.status(401).json({ message: "Unauthorized " })


            const  accessToken  = generateAccessToken(foundUser);
            res.json({ accessToken });
        })
    )



});



export { adminAuth, getUsers, logoutAdmin, updateUserDetails, deleteUser,addUser,refreshAdmin }