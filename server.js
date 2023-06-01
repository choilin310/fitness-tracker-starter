require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = 3000;

const app = express();

const client = require("./db/client");
client.connect();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));

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

const router = require("./routes");
app.use("/api", router);

// Sereve App
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
