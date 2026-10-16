const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use (cors({ origin: "http://localhost:8080" }));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});

app.get("/", (req, res) => {
  res.send("AI Chat Application Backend is running!");
});

app.post("/api/chat", (req, res) => {
  const message = req.body.message;

  res.json({
    userMessage: message,
    reply: `You said: ${message}`
  });
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("chat message", (message) => {
    const text = String(message || "").trim();

    if (text) {
      io.emit("chat message", {
        text: text,
        time: new Date().toISOString()
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Server running at http://localhost:3000");
});