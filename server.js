require("dotenv").config();
const jwt = require('jsonwebtoken');

const express = require("express");
const morgan = require("morgan");
const {apiRouter} = require("./routes");
const PORT = 3000;
const {client} = require("./db/client.js");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api", require("./routes"));

client.connect();

// Error Handler
app.use((err, req, res, next) => {
  res.send({
    message: err.message,
    name: err.name,
    stack: err.stack,
  });
});
app.use((err, req, res, next) => {
  console.error(err); // Log the error object to the console
  res.status(500).json({ error: err.message }); // Respond with an error message
});

// Sereve App
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});

app.use('/api', (req, res, next) => {
  console.log("A request was made to /api");
  next();
});

app.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

