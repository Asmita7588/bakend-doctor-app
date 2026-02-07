
import * as userService from "../services/userService.js";
export const register = async (req, res) => {
    try {
        //#swagger.security = [{"bearerAuth": []}]
        //validate required fields
        const { firstName, email, mobileNumber, role, password} = req.body;
        if (!firstName || !email || !mobileNumber || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await userService.registerUser(req.body);
        
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: "User registered successfully,",
            user: userResponse
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


// export const create = async (req, res) =>{
//   console.log(req.body);
//     const user = await User.create(req.body);
//     res.status(201).json({message: "User created successfully", user});
// }

//   export const getAll = async (req, res) =>{
//   console.log(req.body);
//     const user = await User.find(req.body);
//     res.status(200).json({message: "User fetched suuessfully", user});
// }

export const fetchAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const fetchUserByEmail = async (req, res) => {
    try {
        const user = await userService.getUser(req.params.email);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const updateUserDetails = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        if (!user) return res.status(404).json({ message: "user not found" });
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        console.log(req.params.id)
        //id admin ki nahi honi chaiye

         const findUser = await userService.getUserbyId(req.params.id);
         console.log("sfgfhg",findUser)
         
            if(findUser && findUser.role == "ADMIN"){
               return res.status(200).json({ success: true, message: "ADMIN can not be delete"});  
            }
         

        const user = await userService.deleteUser(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ success: true, message: "User record deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const verifyUserEmailWithOTP = async (req, res) => {
    try {
        const { otp, email } = req.body;
        console.log("OTP" ,otp);
        const user = await userService.verifyUserEmail(email, otp );
        if (!user) return res.status(404).json({ message: "user not found" });
        res.status(200).json({ success: "user verified successfully", data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};