import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ 
    //member since july 2021 createdAt
    username: {
        type: String,
        required: true,
        unique: true,
    },
    fullname:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    followers:[
        {
            type: mongoose.Schema.Types.ObjectId, //16 characters
            ref:"User",
            default: []
        }
    ],
    following:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: []
        }
    ],
    profileImg:{
        type: String,
        default: "",
    },
    coverImg:{
        type: String,
        default: "",
    },
    bio:{
        type:String,
        default: "",
    },
    link:{
        type: String,
        default: "",
    },
    likedPosts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Post",
            default: [],
        },
    ],
}, 
{timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;