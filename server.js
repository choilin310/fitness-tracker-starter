require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const PORT = 3000;

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api", require("./routes"));

// Error Handler
app.use((err, req, res, next) => {
  res.send({
    message: err.message,
    name: err.name,
    stack: err.stack,
  });
});

// Sereve App
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
