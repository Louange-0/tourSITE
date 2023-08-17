import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    place: {
        type: String,
        required: true,
        unique:true
      },
    city: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    hotel: {
        type: String,
        required: true,
      },
      roomtype: {
        type: String,
        required: true,
      },
   
   
     maxGroupSize: {
      type: Number,
      required: false,
    }, 
    start:{
      type: String,
      required: true,
    },
    end:{
      type:String,
      required:true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);