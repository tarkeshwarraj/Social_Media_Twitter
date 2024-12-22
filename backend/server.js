import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js"; // Import the router
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js"; 
import notificationRoutes  from "./routes/notification.route.js";  //Import the routes from file

import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();
const PORT = process.env.PORT || 5000;
console.log(process.env.MONGO_URI)

app.use(express.json());  //to parse req.body
app.use(express.urlencoded({ extended: true }));  //to parse form data(urlencoded)
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Server is Ready");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("api/post", postRoutes);  //missing /
app.use("api/notifications", notificationRoutes);  //missing /



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});