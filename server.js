require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { authRequired } = require("./routes/utils");
const PORT = 3000;
const { client } = require("./db/client.js");

const app = express();

const client = require("./db/client");
client.connect();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, "./client", "dist")));

// Routes
app.use("/api", require("./routes"));

app.get("/test", authRequired, (req, res, next) => {
  res.send("You are authorized");
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
});

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

app.use("/api", (req, res, next) => {
  console.log("A request was made to /api");
  next();
});

app.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});
