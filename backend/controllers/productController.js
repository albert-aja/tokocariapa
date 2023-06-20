const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

//buat Produk
exports.buatProduk = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(200).json({
    berhasil: true,
    product,
  });
});

//ambil semua produk
exports.ambilSemuaProduk = catchAsyncErrors(async (req, res, next) => {
  // return next(new ErrorHandler("ini adalah Error", 500));
  const hasilPerPage = 8;
  const hitungproduct = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;
  let filteredProductsCount = products.length;
  apiFeature.pagination(hasilPerPage);
  products = await apiFeature.query.clone();

  res.status(200).json({
    berhasil: true,
    products,
    hitungproduct,
    hasilPerPage,
    filteredProductsCount,
  });
});

//ambil produk detail
exports.ambilProdukDetail = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Produk tidak ada", 404));
  }
  res.status(200).json({
    berhasil: true,
    product,
  });
});

//update produk
exports.ubahProduk = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Produk tidak ada", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    berhasil: true,
    product,
  });
});

//Hapus Produk
exports.hapusProduk = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Produk tidak ada", 404));
  }
  product.remove();
  res.status(200).json({
    berhasil: true,
    pesan: "Produk berhasil dihapus",
  });
});

//Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    nama: req.user.nama,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);

    product.numOfReviews = product.reviews.length;
  }

  // 4 ,5,5,2 = 16/4=4
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete Reviews
exports.deleteReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Produk tidak ada", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  const ratings = avg / reviews.length;

  const numOfReviews = reviews.length;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
  });
});

//tambah gambar
exports.tambahGambar = catchAsyncErrors(async (req, res, next) => {
  const { public_id, url, productId } = req.body;
  const gambar = {
    public_id,
    url,
  };

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product.gambar.push(gambar);

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
