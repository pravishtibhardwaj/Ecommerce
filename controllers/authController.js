import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import userModel from "./../models/userModel.js";
import orderModel from "../models/orderModel.js";
import JWT from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    if (!name) {
      return res.send({ message: "name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone is required" });
    }
    if (!address) {
      return res.send({ message: "address is required" });
    }
    if (!answer) {
      return res.send({ message: "answer is required" });
    }

    //chck user exist or not
    const existingUser = await userModel.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "user already exist,please login",
      });
    }
    //register user
    const hashedPass = await hashPassword(password);
    console.log(hashedPass);
    const user = await new userModel({
      name,
      email,
      password: hashedPass,
      phone,
      address,
      answer,
    }).save();
    res.status(200).send({
      success: true,
      message: "user registered succesfully",
      user,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "error in registeration",
      err,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "email and password is required",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "email not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "invalid username or password",
      });
    }
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "9d",
    });
    res.status(200).send({
      success: true,
      message: "login succesfull",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        answer: user.answer,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "login failed",
      err,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email)
      res.status(400).send({
        message: "email is required",
      });
    if (!answer)
      res.status(400).send({
        message: "answer is required",
      });
    if (!newPassword)
      res.status(400).send({
        message: "Password is required",
      });
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user do not exist",
      });
    }

    const newhashPass = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: newhashPass });
    res.status(200).send({
      success: true,
      message: "password changed successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "not working",
      err,
    });
  }
};
export const testController = (req, res) => {
  try {
    res.send({ message: "executed succesfully" });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, phone, address } = await req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      { name, email, phone, address },
      { new: true }
    );
    res.status(200).send({
      message: "update dsuccessfully",
      sucess: true,
      updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "error in updating profile",
      success: false,
      err,
    });
  }
};
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyers: req.user._id })
      .populate("products", "-photo")
      .populate("buyers", "name");

    res.status(200).send({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(500).send({
      message: "error in fetching orders",
      err,
      sucess: false,
    });
  }
};
export const getAdminOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyers", "name")
      .sort({ createdAt: "-1" });

    res.status(200).send({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(500).send({
      message: "error in fetching orders",
      err,
      sucess: false,
    });
  }
};

export const updateOrderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    // console.log(orders.status);
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "error in updating status",
      err,
      success: false,
    });
  }
};
