import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js"; // Import the router
import connectMongoDB from "../db/connectMongoDB.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
console.log(process.env.MONGO_URI)

app.get("/", (req, res) => {
    res.send("Server is Ready");
});

//app.use("api/auth", authRoutes);  //missing /
app.use("/api/auth", authRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});