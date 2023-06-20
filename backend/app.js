const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParse = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cookieParse());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());

//route immport
const order = require("./routes/orderRoute");
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

//middleware Error
app.use(errorMiddleware);

module.exports = app;
