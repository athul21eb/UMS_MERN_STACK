import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateJWT.js';
import jwt from 'jsonwebtoken'
///* @desc Auth user/set token 
//// route => POST/api/users/auth
///? @access Public
const Auth = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {

        const  accessToken  = await generateAccessToken(user);
       await generateRefreshToken(res, user);


        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            photo: user.photo,
            accessToken:accessToken
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

        const accessToken  = generateAccessToken(createdUser);
        generateRefreshToken(res, createdUser);
        res.status(201).json({
            id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            phone: createdUser.phone,
            photo: createdUser.photo,
            accessToken
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
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204);//no content

    res.clearCookie("jwt", { httpOnly: true, sameSite: "strict" });


    res.status(200).json({
        message: " user Logged Out successfully"
    });
});

///* @desc Get user Profile
//// route => GET/api/users/profile
///? @access private
const getUserProfile = asyncHandler(async (req, res) => {
    const userId  = req.userId;
    res.status(200).json({ userId });
});

///* @desc Update User profile
//// route => PUT/api/users/profile
///? @access private
const updateUserProfile = asyncHandler(async (req, res) => {


    const user = await User.findById(req.userId);
    if (user) {

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.photo = req.body.photo || user.photo;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            phone: updatedUser.phone,
            email: updatedUser.email,
            photo: updatedUser.photo,

        })


    } else {
        res.status(404);
        throw new Error(`User Not found`);
    }



});

///* @desc Get user Refresh
//// route => GET/api/users/refresh
///? @access public - for  access token when expired
const refresh = asyncHandler(async (req, res) => {

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

export {
    Auth,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    refresh
}