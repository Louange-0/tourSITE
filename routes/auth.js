import  express  from "express";
import { login, register,updateLatestUser } from "../controllers/authController.js";

const router=express.Router()

router.post('/register',register)
router.post('/login',login)
router.put('/update',updateLatestUser)
// router.get('/latestuserid',getLatestRegisteredUserId)

export default router