import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "category already exist",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new category added",
      category,
    });
  } catch (err) {
    // console.log(err);
    res.status(500).send({
      success: false,
      message: "something went wrong",
      err,
    });
  }
};
export const getCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});

    res.send({
      success: true,
      message: "all categories fetched",
      category,
    });
  } catch (err) {
    // console.log(err);
    res.status(500).send({
      success: false,
      message: "error occvured",
      err,
    });
  }
};
export const getSingleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "sibgle category  fetched",
      category,
    });
  } catch (err) {
    // console.log(err);
    res.status(500).send({
      success: false,
      message: "error occvured",
      err,
    });
  }
};
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "category deleted successfully",
    });
  } catch (err) {
    // console.log(err);
    res.status(500).send({
      success: false,
      message: "error in deleting",
      err,
    });
  }
};
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "category already exist",
      });
    }
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
        slug: slugify(name),
      },
      {
        new: true,
      }
    );
    res.status(201).send({
      success: true,
      message: "category updated successfully",
      category,
    });
  } catch (err) {
    // console.log(err);
    res.status(500).send({
      success: false,
      message: "error occured while updating",
      err,
    });
  }
};
