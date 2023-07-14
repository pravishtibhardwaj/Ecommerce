import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout.jsx";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { toast } from "react-hot-toast";
import shoes3 from "../../src/assets/shoes3.webp";
import phone from "../../src/assets/phone.jpg";
import watch2 from "../../src/assets/watch2.jpg";
import laptop from "../../src/assets/laptop.jpg";
// import nfl from "../../src/assets/nfl.png";
// import nfl2 from "../../src/assets/nfl2.png";
// import nfl3 from "../../src/assets/nfl.png";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices.js";
import { Link } from "react-router-dom";
import "../pages/styles/HomePage.css";
import CardMedia from "@mui/material/CardMedia";

import { useCart } from "../context/CartProvider.jsx";
import { useAuth } from "../context/AuthProvider.jsx";
const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  const [ok, setOk] = useState(false);
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      if (data?.success) {
        setProducts(data.perPageProducts);
      }
    } catch (err) {
      setLoading(true);
      console.log(err);
      toast.error("error in fetching");
    }
  };
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (err) {
      console.log(err);
      toast.error("error occured while fetching categories");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  const getFilteredproducts = async () => {
    try {
      const res = await axios.post("/api/v1/product/product-filter", {
        checked,
        radio,
      });
      if (res?.data?.success) {
        // console.log(res.data);
        if (res.data.filteredProducts) setProducts(res.data.filteredProducts);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (checked.length || radio.length) getFilteredproducts();
  }, [checked.length, radio.length]);

  //load more functionality
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      if (data.success) setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getTotal();
  }, []);

  const LoadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      const perPageProductList = [...products, ...data.perPageProducts];
      if (data?.success) setProducts(perPageProductList);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    LoadMore();
  }, [page]);

  const handleCart = (p) => {
    if (auth?.user) {
      setCart([...cart, p]);
      localStorage.setItem(
        `cart_${auth?.user?._id}`,
        JSON.stringify([...cart, p])
      );
      toast.success("Item Added to Cart");
    } else {
      toast.error("Login to Add items to Cart");
    }
  };
  return (
    <Layout title="Home">
      <div className="home-content" style={{ display: "flex" }}>
        <div
          className="filter"
          style={{
            minWidth: "fit-content",
            maxWidth: "30%",
            padding: "30px",
            paddingRight: "80px",
            marginRight: "4px",
            backgroundColor: "white",
            boxShadow: "0px 0px 4px 0px lightgrey",
          }}
        >
          <p
            className="all-filters"
            style={{ fontSize: "16px", fontWeight: "600" }}
          >
            Filters{"           "}
            <button
              className=""
              style={{
                backgroundColor: "white",
                border: "none",
                padding: "5px",
                fontSize: "12px",
                textDecoration: "underline",
                color: "darkred",
                fontWeight: "600",
              }}
              onClick={() => window.location.reload()}
            >
              Clear All
            </button>
          </p>
          <hr />
          {/* <div style={{ width: "inherit", border: "1px solid black" }}></div> */}
          <h6 style={{ fontWeight: "600" }}>Category</h6>
          <div
            className="all-categories "
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                style={{ fontSize: "13px", fontWeight: "500" }}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <br />
          <hr />

          {/* <br /> */}
          <h6 style={{ fontWeight: "600" }}>Price</h6>
          <div className="all-prices ">
            <Radio.Group
              onChange={(e) => setRadio(e.target.value)}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {Prices?.map((p) => (
                <Radio value={p.array} key={p._id} style={{ fontSize: "13px" }}>
                  {p.name}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        </div>
        <div
          className="side-home-content"
          style={{
            width: "100%",
            backgroundColor: "white",
            margin: "13px",
            boxShadow: "0px 2px 6px 2px lightgrey",
            // marginLeft: "0px",
          }}
        >
          <div
            className="slider"
            style={{
              backgroundColor: "white",
            }}
          >
            <div
              id="carouselExampleInterval"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval={10000}>
                  <img
                    src={shoes3}
                    className="d-block w-100"
                    alt="..."
                    style={{
                      height: "350px",
                      width: "100%",
                    }}
                  />
                </div>
                <div className="carousel-item" data-bs-interval={2000}>
                  <img
                    src={phone}
                    className="d-block w-100"
                    alt="..."
                    style={{
                      height: "350px",
                      width: "100%",
                    }}
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={watch2}
                    className="d-block w-100"
                    alt="..."
                    style={{
                      height: "350px",
                      width: "100%",
                    }}
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={laptop}
                    className="d-block w-100"
                    alt="..."
                    style={{
                      height: "350px",
                      width: "100%",
                    }}
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div
            className="all-products "
            style={{
              width: "inherit",
              backgroundColor: "white",
            }}
          >
            {" "}
            {/* <div>{JSON.stringify(checked)}</div> */}
            <h5
              style={{
                fontFamily: "Oxygen, sans-serif",
                padding: "20px",
                fontWeight: "bold",
              }}
            >
              ALL PRODUCTS
            </h5>
            <div
              className="d-flex flex-wrap"
              style={{ alignItems: "center", padding: "10px" }}
            >
              {products.length ? (
                products?.map((p) => (
                  <div
                    className="card m-3 Product-card "
                    style={{
                      width: "17rem",
                      padding: "10px",
                      marginLeft: "10px",
                    }}
                  >
                    <Link
                      to={`/product/${p.name}`}
                      style={{ textDecoration: "none" }}
                    >
                      <CardMedia
                        className="card-img-home"
                        component="img"
                        height="194"
                        image={`/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                      />
                    </Link>
                    {/* <div className="img-container">
                        {" "}
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top card-img"
                          alt={p.name}
                          style={{ padding: "20px" }}
                        />
                      </div> */}

                    <div className="card-body">
                      <Link
                        to={`/product/${p.name}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <h5
                          className="card-title"
                          style={{
                            color: "grey",
                            fontSize: "17px",
                            fontWeight: "600",
                          }}
                        >
                          {p.name}
                        </h5>
                        <p className="card-text" style={{ fontWeight: "400" }}>
                          {p.desc}
                        </p>
                      </Link>
                      <p
                        className="card-price"
                        style={{
                          color: "green",
                          fontWeight: "700",
                          fontSize: "20px",
                        }}
                      >
                        ${p.price}
                        {cart.includes(p) ? (
                          <button
                            className="add-to-cart"
                            style={{ fontSize: "13px" }}
                            onClick={() => navigate("/cart/cart-products")}
                          >
                            GO TO CART
                          </button>
                        ) : (
                          <button
                            className="add-to-cart"
                            style={{ fontSize: "13px" }}
                            onClick={() => {
                              handleCart(p);
                            }}
                          >
                            {/* {console.log(`cart_${auth?.user?._id}`)} */}
                            🛒 ADD TO CART
                          </button>
                        )}
                      </p>
                      {/* <button className="btn btn-secondary">ADD TO CART</button> */}
                    </div>
                  </div>
                ))
              ) : (
                <h3 style={{ color: "lightgrey" }}>
                  <br />
                  <br />
                  👎NO PRODUCT FOUND
                </h3>
              )}
            </div>
            {products && products.length < total && (
              <button
                className="add-to-cart"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {" "}
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
