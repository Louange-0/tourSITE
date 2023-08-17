import mongoose from 'mongoose'; 
const latestUserSchema = new mongoose.Schema({
    latestUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference the User model
    }
});

const LatestUser = mongoose.model('LatestUser', latestUserSchema);
export default LatestUser;