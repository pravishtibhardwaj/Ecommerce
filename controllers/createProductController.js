import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";
dotenv.config();
//The Node.js file system module allows you to work with the file system on your computer.
//Read files
// Create files
// Update files
// Delete files
// Rename files

// payment - gateway;
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    const { name, slug, category, price, desc, quantity, shipping } =
      req.fields; //since we are formiddable to access the form data
    const { photo } = req.files;
    if (!name) {
      return res.status(500).send({ meessage: "name is required" });
    }
    if (!category) {
      return res.status(500).send({ message: "category is required" });
    }
    if (!quantity) {
      return res.status(500).send({ message: "quantity is required" });
    }
    if (!price) {
      return res.status(500).send({ message: "price is required" });
    }
    if (!desc) {
      return res.status(500).send({ message: "description is required" });
    }
    if (!photo) {
      return res.status(500).send({ message: "photo is required" });
    }
    if (photo.size > 1000000) {
      return res.status(500).send({ message: "size should be less than 1mb" });
    }
    // const existingProduct = await productModel.findOne({ name, category });
    // if (existingProduct) {
    //   return res
    //     .status(500)
    //     .send({ message: "product already exists in this category" });
    // }
    const product = new productModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      success: true,
      message: "new product created",
      product,
    });
  } catch (err) {
    // .log(err);
    res.status(500).send({
      success: false,
      message: "some error occured",
      err,
    });
  }
};
export const getProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .populate("category")
      .limit(20)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "all products fetched",
      products,
    });
  } catch (err) {
    // .log(err);
    res.send({ message: "error occvured", err });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "required product fetched",
      product,
    });
  } catch (err) {
    // .log(err);
    res.send({ message: "error occvured", err });
  }
};

export const getPhotoContoller = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (err) {
    // .log(err);
    res.status(500).send({ message: "error occvured", err });
  }
};
export const deleteProductController = async (req, res) => {
  try {
    const product = await productModel
      .findByIdAndDelete(req.params.pid)
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "product deleted successfully",
      product,
    });
  } catch (err) {
    // .log(err);
    res.status(500).send({ message: "error occvured", err });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, category, price, desc, quantity } = req.fields; //sincxe we are using formiddable to access the form data
    const { photo } = req.files;
    if (!name) {
      return res.status(500).send({ error: "name is required" });
    }
    if (!category) {
      return res.status(500).send({ message: "category is required" });
    }
    if (!quantity) {
      return res.status(500).send({ message: "quantity is required" });
    }
    if (!price) {
      return res.status(500).send({ message: "price is required" });
    }
    if (!desc) {
      return res.status(500).send({ message: "description is required" });
    }
    if (!photo) {
      return res.status(500).send({ message: "photo is required" });
    }
    if (photo && photo.size > 1000000) {
      return res.status(500).send({ message: "size should be less than 1mb" });
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      success: true,
      message: " product updated succesfully",
      product,
    });
  } catch (err) {
    // .log(err);
    res.status(500).send({
      success: false,
      message: "error occured while updating product",
      err,
    });
  }
};
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = await req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const filteredProducts = await productModel.find(args);
    res.status(200).send({
      success: true,
      filteredProducts,
    });
  } catch (err) {
    // .log(err);
    res.status(500).send({
      success: false,
      message: "something went wrong",
    });
    err;
  }
};
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      message: "ok count",
      success: true,
      total,
    });
  } catch (err) {
    res.status(400).send({
      message: "error in count products",
      success: false,
      err,
    });
  }
};
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const perPageProducts = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      perPageProducts,
    });
  } catch (err) {
    res.status(400).send({
      message: "error in per page products",
      success: false,
      err,
    });
  }
};
export const searchProdutcController = async (req, res) => {
  try {
    const { keyword } = await req.params;
    const result = await productModel
      .find({
        $or: [
          {
            name: { $regex: keyword, $options: "i" },
          },
          { desc: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.status(200).send({
      result,
    });
  } catch (err) {
    // .log(err);
    res.status(400).send({
      message: "error in search ",
      success: false,
      err,
    });
  }
};
export const relatedProductsController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const relatedProducts = await productModel
      .find({ category: cid, _id: { $ne: pid } })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      message: "successfully fethced related products",
      success: true,
      relatedProducts,
    });
  } catch (err) {
    res.status(400).send({
      message: "something went wrong",
      success: false,
      err,
    });
  }
};

// export const addToCartController = async (req, res) => {
//   try {
//     const { pid } = req.params;
//     const cartProduct = await productModel.findById(pid).select("-photo");
//     // .log(cartProduct);
//     res.status(200).send({
//       message: "done",
//       success: "true",
//       cartProduct,
//     });
//   } catch (err) {
//     .log(err);
//     res.status(400).send({
//       message: "something wrong",
//       success: false,
//       err,
//     });
//   }
// };

//payment gateway

export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send({
          err,
        });
      } else {
        res.send(response);
      }
    });
  } catch (err) {
    // .log(err);
  }
};

export const braintreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyers: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (err) {
    // .log(err);
  }
};
