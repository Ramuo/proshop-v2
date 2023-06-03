import express from 'express';
import {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser
} from '../controllers/userController.js';
import {protect, admin} from '../middleware/authMiddleware.js'

//Initialize router
const router = express.Router();

router.route('/')
    .post(registerUser)
    .get(protect, admin, getUsers);
router.route('/logout').post(logoutUser);
router.route('/login').post(loginUser);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router.route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);



export default router

