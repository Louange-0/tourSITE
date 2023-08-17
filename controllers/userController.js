import User from '../models/User.js'

//creating a new user account


export  const createTour=async (req,res)=>{
    const newUser=new User(req.body)
    try{
        const savedUser=await newUser.save()
        res.status(200).json({success:true,message:'successfully created', data:savedUser})
    }catch (err){
console.error(err);
        res.status(500).json({success:false, message:'Failed to create. Try again'})
    }
}
//updating the account
export const updateUser=async(req,res)=>{
    const id=req.params.id
    try{
const updatedUser=await User.findByIdAndUpdate(id,{
    $set:req.body,
},{new:true})


res.status(200).json({success:true,message:'successfully updated', data:updatedUser,
});
    }catch(err){
        res.status(500).json
        ({success:false,message:'failed to update'})
    }
};
//Deleting an account 
export const deleteUser=async(req,res)=>{
    const id=req.params.id
    try{
await User.findByIdAndDelete(id)


res.status(200).json({success:true,message:'successfully deleted'
});
    }catch(err){
        res.status(500).json
        ({success:false,message:'failed to delete'})
    }
};
//get a single user account
export const getSingleUser=async(req,res)=>{
    const id=req.params.id
    try{
const user=await User.findById(id)


res.status(200).json({success:true,message:'successful',
data:user
});
    }catch(err){
        res.status(404).json
        ({success:false,message:'not found'})
    }
};

//get all user accounts
export const getAllUser=async(req,res)=>{
    try{
const users=await User.find({})
res.status(200).json({success:true,message:'successful',
data:users})
    }catch(err){
        res.status(404).json
        ({success:false,message:'not found'})  
    }
};