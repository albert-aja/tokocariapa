const rateLimit = require("../middleware/rateLimiter");

const express = require("express");
const {
  ambilSemuaProduk,
  buatProduk,
  ubahProduk,
  hapusProduk,
  ambilProdukDetail,
  createProductReview,
  getProductReviews,
  deleteReviews,
  tambahGambar,
} = require("../controllers/productController");
const { isAuthUser, authorizeRoles } = require("../middleware/auth");

const router = express();

router.route("/products").get(rateLimit, ambilSemuaProduk);

router
  .route("/admin/product/new")
  .post(isAuthUser, authorizeRoles("admin"), buatProduk);
router
  .route("/admin/product/:id")
  .put(isAuthUser, authorizeRoles("admin"), ubahProduk)
  .delete(isAuthUser, authorizeRoles("admin"), hapusProduk);

router.route("/product/:id").get(ambilProdukDetail);

router.route("/review").put(isAuthUser, createProductReview);
router.route("/gambar").put(isAuthUser, tambahGambar);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthUser, deleteReviews);

module.exports = router;
