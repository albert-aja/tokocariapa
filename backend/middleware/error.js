const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.kodeStatus = err.kodeStatus || 500;
  err.message = err.message || "Internal Server Error";

  //mongodb id error
  if (err.name === "CastError") {
    const message = `Resource tidak ditemukan. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //Mongoo duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  //JWT Expire error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, try again`;
    err = new ErrorHandler(message, 400);
  }

  // console.log(err.kodeStatus);
  // console.log(err.message);

  res.status(err.kodeStatus).json({
    berhasil: false,
    error: err.kodeStatus,
    pesan: err.message,
  });
};
