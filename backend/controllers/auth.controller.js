import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import {generateTokenAndSetCookie} from "../lib/utils/generateToken.js"


export const signup = async (req, res) => {
    try {
        const {fullname, username, email, password} = req.body;

        //emailexep check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({error: "Invalid email format"});
        }

        //usercheck
        const existingUser = await User.findOne({ username });
        if(existingUser){
            return res.status(400).json({error: "Username is already taken"});
        }

        //emailcheck
        const existingEmail = await User.findOne({ email });
        if(existingEmail){
            return res.status(400).json({error: "Email is already taken"});
        }

        //password hash
        const salt = await  bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname,
            username,
            email,
            password: hashedPassword
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res)   //generate the jwt token
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
            })
        }else{
            res.status(400).json({error: "Invalid user data"});
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Internal Server Error"});       
    }
};

export const login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid username or password"})
        }

        generateTokenAndSetCookie(user._id, res);  //generate the jwt token

        res.status(201).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
        })
    }catch(error){
        console.log("Error in login controller", error.message);
        res.status(500).json({error: "Internal Server Error"});       
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller", error.message);
    }
};

export const getMe = async (req, res) =>{
    try{
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    }catch(error){
        console.log("Error in logout controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};