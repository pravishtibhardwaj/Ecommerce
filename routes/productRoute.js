import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  // addToCartController,
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getPhotoContoller,
  getProductsController,
  getSingleProductController,
  productCountController,
  productFilterController,
  productListController,
  relatedProductsController,
  searchProdutcController,
  updateProductController,
} from "../controllers/createProductController.js";
import formidable from "express-formidable";
const router = express.Router();
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);
router.get("/get-products", getProductsController);
router.get("/get-products/:slug", getSingleProductController);
router.get("/product-photo/:pid", getPhotoContoller);
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

//filgter product
router.post("/product-filter", productFilterController);
//product-count
router.get("/product-count", productCountController);

//product list based on per page
router.get("/product-list/:page", productListController);

//search
router.get("/search/:keyword", searchProdutcController);

//related products
router.get("/related-products/:pid/:cid", relatedProductsController);

//add-to-cart
// router.get("/add-to-cart/:pid", addToCartController);

//payment routes

router.get("/braintree/token", braintreeTokenController);

router.post("/braintree/payment", requireSignIn, braintreePaymentController);
export default router;
