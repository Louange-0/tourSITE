import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    mapAddress: {
      type: String,
      default: "kigali rwanda",
    },
    city: {
      type: String,
      default: "kigali",
    },
    country: {
      type: String,
      default: "rwanda",
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: false }
);
userSchema.index({name:1},{unique:false});

export default mongoose.model("User", userSchema);
