const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    infoPengiriman,
    pesananBarang,
    infoPembayaran,
    hargaSatuan,
    ongkir,
    estimasi,
    totalHarga,
  } = req.body;

  const order = await Order.create({
    infoPengiriman,
    pesananBarang,
    infoPembayaran,
    hargaSatuan,
    ongkir,
    estimasi,
    totalHarga,
    tanggalPesanan: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

//get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "nama email"
  );
  if (!order) {
    return next(new ErrorHandler("Order tidak ditemukan dengan id ini", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

//get Logged in user orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({
    user: req.user._id,
  });
  res.status(200).json({
    success: true,
    orders,
  });
});

//get All Order --Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalbayar = 0;
  orders.forEach((order) => {
    totalbayar += order.totalHarga;
  });
  res.status(200).json({
    success: true,
    totalbayar,
    orders,
  });
});

//get Order Status --Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order tidak ditemukan dengan id ini", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  order.pesananBarang.forEach(async (o) => {
    await updateStock(o.product, o.jumlah);
  });

  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, jumlah) {
  const product = await Product.findById(id);
  product.Stock -= jumlah;
  await product.save({ validateBeforeSave: false });
}

//delete Order --Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  await order.remove();

  if (!order) {
    return next(new ErrorHandler("Order tidak ditemukan dengan id ini", 404));
  }

  res.status(200).json({
    success: true,
  });
});
