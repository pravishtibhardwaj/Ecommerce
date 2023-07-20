import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";
import Layout from "../../components/Layout/Layout.jsx";
import axios from "axios";
import "../styles/createCategory.css";
import "../styles/createProduct.css";
import { toast } from "react-toastify";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
const CreateProduct = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState(0);
  const [shipping, setShipping] = useState(null);
  const navigate = useNavigate();
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

  const handleCreate = async (e) => {
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

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
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
      toast.error("something went wrong while creating product");
    }
  };
  return (
    <Layout title="New Category">
      <div className="main-admin ">
        <div className="sidebar">
          <AdminMenu />
        </div>
        <div className="content-head">
          <div className="addProduct">
            {/* <form onSubmit={handleCreate}> */}
            <div className="selectCAt mb-3 product-input">
              <Select
                style={{ border: "2px solid black" }}
                placeholder="Select Category"
                showSearch
                size="small"
                bordered={false}
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
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
                  name="photo  "
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3 product-input">
              {photo && (
                <div className="text-center img img-responsive">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product photo"
                    height={"50px"}
                    width={"50px"}
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
                onChange={(e) => setName(e.target.value)}
                required
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
                required
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="mb-3 product-input ">
              <input
                type="text"
                name="price"
                placeholder="Enter price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 product-input">
              <input
                type="text"
                name="qty"
                placeholder="Enter Quantity"
                className="form-control"
                onChange={(e) => setQty(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 product-input">
              <Select
                style={{ border: "2px solid black" }}
                placeholder="Shipping"
                showSearch
                size="small"
                bordered={false}
                className="form-select mb-3 product-input form-control"
                onChange={(value) => setShipping(value)}
                required
              >
                <Option value={0}>Yes</Option>
                <Option value={1}>No</Option>
              </Select>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleCreate}
            >
              Create
            </button>
            {/* </form> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
