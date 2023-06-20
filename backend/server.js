const app = require("./app");
const env = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

//handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled uncaught exception`);
  process.exit(1);
});

//config
env.config({ path: "backend/config/config.env" });

//database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`server berjalan di http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
