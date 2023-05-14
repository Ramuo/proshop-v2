import { request } from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import User  from '../models/userModel.js';


//@desc     Login user & and get the token (signin)
//@route    POST /api/users/login
//@access   Public
const loginUser = asyncHandler(async(req, res) => {
   const {email, password} = req.body;

   //Let us find a user
   const user = await User.findOne({ email });

   // Let us validate user cedential
   if(user && (await user.matchPassword(password))){
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    })
   }else{
    res.status(401);
    throw new Error("Email ou mot de passe invalide");
   }
});

//@desc     Register new user (signup)
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler(async(req, res) => {
    res.send('register new user');
});

//@desc     Logout user / clear the cookie
//@route    POST /api/users/logout
//@access   Private
const logoutUser = asyncHandler(async(req, res) => {
    res.send('logout user');
});

//@desc     Get user profile
//@route    GET /api/users/profile
//@access   Private
const getUserProfile = asyncHandler(async(req, res) => {
    res.send('Get user profile ');
});

//@desc     Update user profile
//@route    PUT /api/users/profile
//@access   Private
const updateUserProfile = asyncHandler(async(req, res) => {
    res.send('Update user profile ');
});

//@desc     Get all users
//@route    GET /api/users
//@access   Private/Admin
const getUsers = asyncHandler(async(req, res) => {
    res.send('Get users ');
});

//@desc     Get user by ID
//@route    GET /api/users/:id
//@access   Private/Admin
const getUserById = asyncHandler(async(req, res) => {
    res.send('Get user By Id ');
});

//@desc     Delete users
//@route    DELETE /api/users/:id
//@access   Private/Admin
const deleteUser = asyncHandler(async(req, res) => {
    res.send('Delete user ');
});

//@desc     Update user 
//@route    PUT /api/users/:id
//@access   Private/admin
const updateUser = asyncHandler(async(req, res) => {
    res.send('Update user  ');
});

export {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
}
