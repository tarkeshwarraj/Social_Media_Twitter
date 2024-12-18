import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js"; // Import the router
import userRoutes from "./routes/user.routes.js";
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

//app.use("api/auth", authRoutes);  //missing /
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});