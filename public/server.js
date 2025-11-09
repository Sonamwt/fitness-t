const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Database setup
const db = new sqlite3.Database("./database.db");

// Create tables if not exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )`);
});

// Routes

// Serve index.html at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Register route
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  db.run(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, password],
    (err) => {
      if (err) {
        return res.status(400).json({ error: "User already exists" });
      }
      res.json({ message: "User registered successfully" });
    }
  );
});

// Start server
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);

