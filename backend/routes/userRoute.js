const rateLimit = require("../middleware/rateLimiter");
const express = require("express");

const {
  daftarUser,
  loginUser,
  logout,
  forgotPasssword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(daftarUser);
router.route("/login").post(rateLimit.rateLimitLogin, loginUser);
router.route("/password/forgot").post(forgotPasssword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthUser, getUserDetails);
router.route("/me/update").put(isAuthUser, updateProfile);
router.route("/password/update").put(isAuthUser, updatePassword);
router
  .route("/admin/users")
  .get(isAuthUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
