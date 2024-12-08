import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js"; // Import the router
import userRoutes from "./routes/user.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";

dotenv.config();
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