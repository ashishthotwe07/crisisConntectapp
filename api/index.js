import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import AuthRouter from "./routes/auth.routes.js";
import EmergencyRoutes from "./routes/emergency.routes.js";
import volunteerRoutes from "./routes/volunteer.routes.js";
import chatRouter from "./routes/chat.routes.js";
import path from "path";

dotenv.config();

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const __dirname = path.resolve();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api/auth", AuthRouter);
app.use("/api/emergency", EmergencyRoutes);
app.use("/api/volunteer", volunteerRoutes);
app.use("/api/chats", chatRouter);

io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
