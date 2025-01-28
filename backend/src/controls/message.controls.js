import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";


export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId} }).select("-password");

        res.status(200).json(filteredUsers)

    } catch (error) {
        console.log("Error in getUserForSidebar controls: ", error.message);
        res.status(500).json( { error: "Internal Sever Error" })        
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const messages = await Message.find({
            $or:[
                    {senderId: senderId, receiverId: userToChatId},
                    {senderId: userToChatId, receiverId: senderId}    
            ]
        })
        
        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages controls: ", error.message);
        res.status(500).json( { error: "Internal Sever Error" })       
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if (image && Buffer.byteLength(image, 'base64') > 10 * 1024 * 1024) {
            return res.status(413).json({ error: "Image is too large. Maximum size is 10MB." });
        }

        let imageUrl;
        if (image) {
            const uploadRes = await cloudinary.uploader.upload(image);
            imageUrl = uploadRes.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessage controls:", error.message);
        res.status(500).json({ error: "Internal Server Error." });
    }
};