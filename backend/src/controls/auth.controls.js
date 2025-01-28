import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"


export const signup = async (req,res) => {
    
    const {fullName, email, password} = req.body
    try {

        if (!fullName || !email || !password) {

            return res.status(400).json({ message: "All fields are required."});
        }

        if (password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters!"})
        }

        const user = await User.findOne({email})
        if(user) return res.status(400).json({message: "Email already exists."})
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        })

        if(newUser){
            generateToken(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
            });

        } else{
            res.status(400).json({message:"Invalid User data!"})
        }

    } catch (error) {
        console.log("Error in signup control", error.message);
        res.status(500).json({message: "Internal Server Error."})
        
    }
};

export const login = async (req,res) => {
    
    const {email, password} = req.body;
    
    try {

        const user = await User.findOne({email})
        if(!user){  
            return res.status(400).json({message:"Invalid credentials!"})
        }

        const isPassCorrect = await bcrypt.compare(password, user.password)
        if(!isPassCorrect){
            return res.status(400).json({ message: "Invalid credentials!" })
        }

        generateToken(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePicture: user.profilePicture,
        })

    } catch (error) {
        console.log("Error in login control", error.message);
        res.status(500).json({ message: "Internal Server Error." })        
    }
};

export const logout = async (req,res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out Successfully." })
    } catch (error) {
        console.log("Error in logout control", error.message);
        res.status(500).json({ message: "Internal Server Error." })
        
    }
};

export const updateProfile = async (req,res) => {
    try {
        const {profilePicture} = req.body;

        const userId = req.user._id;

        if(!profilePicture){
            return res.status(400).json({ message: "Profile picutre is required" });
        }

        // Validate base64 data
        const matches = profilePicture.match(/^data:image\/(png|jpeg|jpg);base64,/);
        if (!matches) {
            return res.status(400).json(
                { message: "Invalid image format. Only .JPG .JPEG .PNG files are allowed." }
            );
        }

        // Decode base64 and check file size
        const base64Data = profilePicture.split(",")[1];
        const buffer = Buffer.from(base64Data, 'base64');
        const MAX_SIZE = 10 * 1024 * 1024; 
        if (buffer.length > MAX_SIZE) {
            return res.status(400).json(
                { message: "Image size exceeds 10MB." }
            );
        }

        const uploadRes = await cloudinary.uploader.upload(profilePicture)
        .catch(error => {
            console.log("Cloudinary error:", error.message);
            return res.status(500).json({ message: "Error uploading image to Cloudinary" });
        });
        const updateUser = await User.findByIdAndUpdate(
            userId, 
            {
                profilePicture: uploadRes.secure_url
            }, 
            {
                new:true
            });

        res.status(200).json(updateUser)

    } catch (error) {
        console.log("Error in upadte profile", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const checkAuth = (req,res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth control", error.message);
        res.status(500).json({ message: "Internal Sever Error" })
    }
};