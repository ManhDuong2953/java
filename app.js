const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "nodejs_api",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Connected to the database!");
});

// GET all users
app.get("/", (req, res) => {
  const sql = "SELECT * FROM nodejs_api.products";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// GET a user by ID
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM nodejs_api WHERE id = ${id}`;
  connection.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results[0]);
  });
});

// POST a new user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  const data = [name, email];
  connection.query(sql, data, (error, results) => {
    if (error) throw error;
    res.send({ id: results.insertId, name, email });
  });
});

// PUT (update) a user by ID
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
  const data = [name, email, id];
  connection.query(sql, data, (error, results) => {
    if (error) throw error;
    res.send({ id, name, email });
  });
});

// DELETE a user by ID
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM users WHERE id = ${id}`;
  connection.query(sql, (error, results) => {
    if (error) throw error;
    res.send({ message: "User deleted successfully." });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`API server is listening on port ${port}`);
});

const axios = require("axios");
axios
  .get("localhost:3000")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
