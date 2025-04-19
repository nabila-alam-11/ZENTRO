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

app.get("/", (req, res) => {
  res.send(` 
    <div style="font-family: Arial, sans-serif; background: #f0f4f8; padding: 50px; text-align: center;">
      <h1 style="color: #2c3e50; font-size: 3rem;">✨ Welcome to <span style="color: #0d6efd;">ANVAYA</span> ✨</h1>
      <p style="font-size: 1.2rem; color: #555;">Your powerful CRM solution to manage leads, clients, and sales – all in one place.</p>
    </div>
    `);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on PORT", PORT);
});
