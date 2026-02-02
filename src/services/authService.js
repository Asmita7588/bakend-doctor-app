// import User from "../models/userModel.js"
// import bcrypt from 'bcryptjs';

// export async function loginUser(email, password) {

//     const user =  await User.findOne({email}).select('+password');

//     if(!user){
//         console.error("no user found");
//     }
//     console.log("DB Password:", user.password);
//     const isMatch =  await bcrypt.compare(password, user.password);
//     console.log(password + user.password + isMatch)
    
//     if(!isMatch){
//         console.error("Invalid password");
//     }
//      const userObject = user.toObject();
//      delete userObject.password;
//     return userObject;
// }