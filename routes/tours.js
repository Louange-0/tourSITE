import  express from "express";
import { createTour,updateTour,deleteTour,getSingleTour,getAllTour } from '../controllers/tourController.js'
import { verifyAdmin } from "../utils/verifyToken.js";


const router=express.Router()

//create new tour
router.post('/',verifyAdmin,createTour)

// update a tour
router.put('/:id',verifyAdmin,updateTour)

//delete tour
router.delete('/:id',verifyAdmin,deleteTour)

//get a single tour
router.get('/:id',verifyAdmin,getSingleTour)

//get all tours
router.get ('/',verifyAdmin,getAllTour)


export default router;