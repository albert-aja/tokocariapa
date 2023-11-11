const express = require("express");

const {
  masukKeranjang,
  ambilKeranjangUser,
  hapusKeranjang,
} = require("../controllers/cartController");
const { isAuthUser } = require("../middleware/auth");
const router = express.Router();

router.route("/cart/new").post(isAuthUser, masukKeranjang);
router.route("/cart/me").get(isAuthUser, ambilKeranjangUser);
router
  .route("/cart/delete/:userid/:productid")
  .post(isAuthUser, hapusKeranjang);

module.exports = router;
