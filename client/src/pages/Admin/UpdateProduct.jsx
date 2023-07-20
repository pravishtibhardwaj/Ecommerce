import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";
import Layout from "../../components/Layout/Layout.jsx";
import axios from "axios";
import "../styles/createCategory.css";
import "../styles/createProduct.css";
import { toast } from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState(0);
  const [shipping, setShipping] = useState(null);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-products/${params.slug}`
      );
      // console.log(data.product);
      if (data.success) {
        setName(data.product.name);
        setCategory(data.product.category._id);
        setPhoto(data.product.photo);
        setDesc(data.product.desc);
        setPrice(data.product.price);
        setQty(data.product.quantity);
        setShipping(data.product.shipping);
        setId(data.product._id);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      // console.log(err);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (err) {
      // console.log(err);
      toast.error("error occured while fetching categories");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("category", category);
      productData.append("photo", photo);
      productData.append("desc", desc);
      productData.append("quantity", qty);
      productData.append("price", price);
      productData.append("shipping", shipping);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success(data.message);
        setTimeout(() => {
          navigate("/dashboard/admin/all-products");
        }, 1000);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      // console.log(err);
      toast.error("something went wrong in updating product");
    }
  };
  return (
    <Layout title={name}>
      <div className="main-admin ">
        <div className="sidebar">
          <AdminMenu />
        </div>
        <div className="content-head">
          <div className="addProduct">
            {/* <form onSubmit={handleCreate}> */}
            <div className="selectCAt mb-3 product-input">
              <Select
                style={{ border: "2px solid black", minWidth: "14rem" }}
                placeholder="Select Category"
                showSearch
                size="small"
                bordered={false}
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
                value={category}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className=" mb-3 product-input ">
              <label className="btn btn-primary product-photo">
                {photo ? photo.name : <span>Upload Image</span>}
                <input
                  type="file"
                  name="photo "
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  // value={photo}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3 product-input">
              {photo ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"50px"}
                    width={"50px"}
                    className=" img img-responsive"
                  />
                </div>
              ) : (
                <div className="text-center ">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                    alt="product photo"
                    height={"50px"}
                    width={"50px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
            <div className="mb-3 product-input">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Name "
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3 product-input">
              <textarea
                name="desc"
                id="desc"
                cols="30"
                rows="4"
                className="form-control"
                placeholder="Write something about the product"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="mb-3 product-input ">
              <input
                type="text"
                name="price"
                placeholder="Enter price"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3 product-input">
              <input
                type="text"
                name="qty"
                placeholder="Enter Quantity"
                className="form-control"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </div>
            <div className="mb-3 product-input">
              <Select
                style={{
                  border: "2px solid black",
                  minWidth: "37vw",
                  // maxWidth: "40vw",
                }}
                placeholder="Shipping"
                showSearch
                size="small"
                bordered={false}
                className="form-select mb-3 product-input form-control"
                // value={shipping}
                onChange={(value) => setShipping(value)}
                value={shipping ? "yes" : "no"}
              >
                <Option value={0}>Yes</Option>
                <Option value={1}>No</Option>
              </Select>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleUpdate}
            >
              Update
            </button>
            {/* </form> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
