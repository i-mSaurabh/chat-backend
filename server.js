const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Simple rule-based chatbot
function getBotReply(message) {
  const msg = message.toLowerCase();

  // Greetings
  if (msg.includes("hello") || msg.includes("hi")) return "Hello! 👋 How can I help you?";
  if (msg.includes("good morning")) return "Good morning! 🌞";
  if (msg.includes("good night")) return "Good night! 🌙 Sleep well!";
  if (msg.includes("bye")) return "Goodbye! 👋";

  // About bot
  if (msg.includes("your name")) return "I’m your personal chatbot 🤖";
  if (msg.includes("who made you") || msg.includes ("owner")) return "I was created by Saurabh Kumar 🧑‍💻";
  if (msg.includes("how old are you")) return "I was born in 2025, so I’m pretty new!";
  if (msg.includes("purpose") || msg.includes("what can you do")) return "I can chat with you and answer basic questions.";

  // General knowledge
  if (msg.includes("time")) return `The current time is ${new Date().toLocaleTimeString()}`;
  if (msg.includes("date")) return `Today's date is ${new Date().toLocaleDateString()}`;
  if (msg.includes("capital of india")) return "The capital of India is New Delhi.";
  if (msg.includes("capital of usa")) return "The capital of USA is Washington, D.C.";
  if (msg.includes("capital of uk")) return "The capital of the UK is London.";
  if (msg.includes("largest country")) return "The largest country by area is Russia.";
  if (msg.includes("smallest country")) return "The smallest country is Vatican City.";
  if (msg.includes("tallest mountain")) return "The tallest mountain is Mount Everest (8848m).";
  if (msg.includes("longest river")) return "The longest river is the Nile River in Africa.";
  if (msg.includes("largest ocean")) return "The largest ocean is the Pacific Ocean.";
  if (msg.includes("fastest animal")) return "The cheetah is the fastest land animal.";
  if (msg.includes("deepest ocean")) return "The Mariana Trench in the Pacific Ocean is the deepest part of Earth's oceans.";

  // Fun facts
  if (msg.includes("joke")) return "😂 Why don’t skeletons fight each other? Because they don’t have the guts!";
  if (msg.includes("fun fact")) return "Did you know? Octopuses have three hearts!";
  if (msg.includes("riddle")) return "🤔 What has to be broken before you can use it? — An egg!";
  
  // Personal interaction
  if (msg.includes("how are you")) return "I’m doing great! Thanks for asking. How about you?";
  if (msg.includes("i am fine")) return "Glad to hear that! 😊";
  if (msg.includes("thank you") || msg.includes("thanks")) return "You’re welcome! 🙌";
  if (msg.includes("weather")) return "I can't check live weather yet, but I hope it's nice where you are! 🌤️";
  if (msg.includes("your favorite color")) return "I like blue 💙 — it reminds me of the sky and oceans.";

  // Default
  return "Sorry, I didn’t understand that. Try asking something else!";
}


// API endpoint
app.post("/chat", (req, res) => {
  const userMessage = req.body.message || "";
  const reply = getBotReply(userMessage);
  res.json({ reply });
});

// Start server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

