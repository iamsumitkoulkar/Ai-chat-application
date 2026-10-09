const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("AI Chat Application Backend is running!");
});

app.post("/api/chat", (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({
      error: "Message is required"
    });
  }

  res.json({
    userMessage: userMessage,
    reply: `You said: ${userMessage}`
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});