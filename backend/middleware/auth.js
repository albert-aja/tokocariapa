const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  //   console.log(token);

  if (!token) {
    return next(new ErrorHandler("Harap login untuk mengakses resource", 401));
  }
  const decodeData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodeData.id);
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role ${req.user.role} tidak diizinkan untuk mengakses resource`,
          403
        )
      );
    }
    next();
  };
};
