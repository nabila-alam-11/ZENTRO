const express = require("express"); // This imports Express Framework.
const app = express(); // It creates an app object to build a web server, used to define routes, apply middleware, and handle HTTP requests.

const { initializeDatabase } = require("./db/db.connect");
initializeDatabase();
