const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const commentRoutes = require("./routes/comments");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Socket.io connection
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("taskUpdated", (data) => io.emit("taskUpdated", data));
  socket.on("disconnect", () => console.log("Client disconnected"));
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/tasks/:taskId/comments", commentRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
