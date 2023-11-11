const Cart = require("../models/cartModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");

exports.masukKeranjang = catchAsyncErrors(async (req, res, next) => {
  let cart;
  let docs = await Cart.find({
    user_id: req.body.user_id,
    product_id: req.body.product_id,
  });

  if (docs.length > 0) {
    req.body.jumlah += parseInt(docs[0].jumlah);
    cart = await Cart.findByIdAndUpdate(docs[0]._id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  } else {
    cart = await Cart.create(req.body);
  }

  res.status(200).json({
    berhasil: true,
    cart,
  });
});

exports.ambilKeranjangUser = catchAsyncErrors(async (req, res, next) => {
  const carts = await Cart.find({
    user_id: req.user.id,
  }).populate("product_id");

  if (!carts) {
    return next(new ErrorHandler("Keranjang tidak ada", 404));
  }
  res.status(200).json({
    berhasil: true,
    carts,
  });
});

exports.ubahKeranjang = catchAsyncErrors(async (req, res, next) => {
  let cart = await Cart.findById(req.params.id);
  if (!cart) {
    return next(new ErrorHandler("Keranjang tidak ada", 404));
  }
  cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    berhasil: true,
    cart,
  });
});

exports.hapusKeranjang = catchAsyncErrors(async (req, res, next) => {
  const cart = await Cart.findById(req.params.id);
  if (!cart) {
    return next(new ErrorHandler("Keranjang tidak ada", 404));
  }
  cart.remove();
  res.status(200).json({
    berhasil: true,
    pesan: "Keranjang berhasil dihapus",
  });
});
