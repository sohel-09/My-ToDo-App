const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const DB_CONFIG = {
  host: process.env.DB_HOST || "db",   // service name in docker-compose
  user: process.env.DB_USER || "todo_root",
  password: process.env.DB_PASSWORD || "todo_pass",  // empty password for root
  database: process.env.DB_NAME || "todo_db",
};

const connection = mysql.createConnection(DB_CONFIG);

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.code);
    process.exit(1); // exit if cannot connect
  }
  console.log("Connected to MySQL!");
});

module.exports = connection;



// API routes
app.get("/tasks", (req, res) => {
  connection.query("SELECT * FROM tasks", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;
  connection.query(
    "INSERT INTO tasks (title) VALUES (?)",
    [title],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, title });
    }
  );
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM tasks WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.get("/todos", (req, res) => {
  res.json({ message: "Hello Todos!" });
});


app.listen(5000, () => console.log("Backend running on port 5000"));
