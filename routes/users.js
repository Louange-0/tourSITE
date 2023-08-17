import express from 'express'
import { deleteUser, getAllUser, getSingleUser, updateUser } from '../controllers/userController.js';
import { verifyUser } from '../utils/verifyToken.js';
const router=express.Router()

// update a user
router.put('/:id',verifyUser,updateUser)

//delete user
router.delete('/:id',verifyUser,deleteUser)

//get a single user
router.get('/:id',verifyUser, getSingleUser)

//get all users
router.get ('/',verifyUser,getAllUser)

export default router