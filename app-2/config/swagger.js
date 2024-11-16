const dotenv = require('dotenv');
dotenv.config();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRUD Application API",
      version: "1.0.0",
      description: "API documentation for the CRUD Application",
    },
    servers: [
      {
        url: process.env.SERVER_URL || "http://localhost:3000", // Use SERVER_URL from .env or default to localhost
        description: "Development Server",
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js"], // Path to the API files
};

module.exports = swaggerOptions;