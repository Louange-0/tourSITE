import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import LatestUser from '../models/latestuser.js';

dotenv.config();




  

// user registration
export const register = async (req, res) => {
  // hashing password
 
  try {
    const salt = bcrypt.genSaltSync(10)
    const password=req.body.password;
  


    if(!password){
        throw new Error('password is missing')
    }
    const hash = bcrypt.hashSync(req.body.password, salt)


    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hash,
      mapAddress: req.body.mapAddress,
      city: req.body.city,
      country: req.body.country,
      registrationDate:new Date()
    });

    const savedUser=await newUser.save();

    
    // Update the latestUserId in LatestUser collection
    const latestUser = await LatestUser.findOneAndUpdate(
        {},
        { latestUserId: savedUser._id },
        { upsert: true, new: true }
    );

    res.status(200).json({ success: true, message: 'Successfully registered' })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create. Try again' })
    console.error(err)
  }
}

// export const getLatestRegisteredUserId = async (req, res) => {
//     try {
//       const latestUser = await User.findOne({}, {}, { sort: { registrationDate: -1 } });
  
//       if (!latestUser) {
//         return res.status(404).json({ success: false, message: 'No users found' });
//       }
  
//       res.status(200).json({ success: true, userId: latestUser._id });
//     } catch (err) {
//       res.status(500).json({ success: false, message: 'Failed to get latest user ID' });
//     }
//   };
  

// user login
export const login = async (req, res) => {
  const email = req.body.email

  try {
    const user = await User.findOne({ email })

    // if the user doesn't exist
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    // if the user exists then check the password
    const checkPassword = await bcrypt.compare(req.body.password, user.password)

    // if passwords don't match
    if (!checkPassword) {
      return res.status(401).json({ success: false, message: 'Incorrect email or password' })
    }

    // Create an information object with necessary user information (excluding password and sensitive data)
    const information = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      // Add any other user-specific information you want to include in the token
    };
    const { password, role, ...rest } = user._doc;

    // create jwt token
    const token = jwt.sign(information, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    // set token in the browser cookies and send the response to the client
    res
      .cookie('accessToken', token, {
        httpOnly: true,
        expiresIn: '1h', // Note that expiresIn is not a property of the token; it should be set here in your code
      })
      .status(200)
      .json({
        success: true,
        token,
        information,
        message: 'Successfully logged in',
      });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to login' });
  }
}

export const updateLatestUser = async (req, res) => {
    const { mapAddress, city, country } = req.body;

    try {
        // Get the latestUserId from LatestUser collection
        const latestUserDoc = await LatestUser.findOne();

        if (!latestUserDoc) {
            return res.status(404).json({ success: false, message: 'No latest user found' });
        }

        const latestUserId = latestUserDoc.latestUserId;

        // Update the latest user's data
        const updatedUser = await User.findOneAndUpdate(
            { _id: latestUserId },
            {
                $set: {
                    mapAddress: req.body.mapAddress,
                    city: req.body.city,
                    country: req.body.country,
                    // ... other fields you want to update
                }
            },
            { new: true }
        );

        return res.status(200).json({ success: true, message: 'Latest user data updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating latest user:', error);
        return res.status(500).json({ success: false, message: 'Failed to update latest user data' });
    }
};


  



  
