const mongoose = require("mongoose"); // It imports Mongoose to interact with MongoDb using schema-based models in Node.js

require("dotenv").config(); // It initializes dotenv to load environment variable from a .env file into process.env keeping configuration data secure and manageable

const mongoUri = process.env.MONGODB; // MONGODB connection string

// This function connects my app to the MONGODB database using Mongoose. If the connection works, it logs a success message; if it fails, it logs the error."
const initializeDatabase = async () => {
  await mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((error) => console.log("Error connecting to database", error));
};
module.exports = { initializeDatabase };
