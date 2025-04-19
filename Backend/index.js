const express = require("express"); // This imports Express Framework.
const app = express(); // It creates an app object to build a web server, used to define routes, apply middleware, and handle HTTP requests.

const { initializeDatabase } = require("./db/db.connect");
initializeDatabase();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: "*",
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json()); // MIDDLEWARE - It automatically parses incoming request bodies with JSON data and makes them available under req.body for further processing in route handlers.
