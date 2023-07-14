import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  testController,
  updateProfileController,
  getOrdersController,
  getAdminOrdersController,
  updateOrderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routing
//register || method post
router.post("/register", registerController);

//login || method post
router.post("/login", loginController);

//forgot-password || method post
router.post("/forgot-password", forgotPasswordController);

//gtest route
router.get("/test", requireSignIn, isAdmin, testController);

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/user-cart", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/update-profile", requireSignIn, updateProfileController);

//orders. route
router.get("/orders", requireSignIn, getOrdersController);

//admin-orders
router.get("/admin-orders", requireSignIn, isAdmin, getAdminOrdersController);

router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  updateOrderStatusController
);
export default router;
