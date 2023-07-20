import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartProvider.jsx";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthProvider.jsx";

const ProductDetails = () => {
  //   const [id, setId] = useState("");
  const [product, setProduct] = useState([]);
  const [related, setRelated] = useState([]);
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart([]);
  const params = useParams();
  const getSingleProduct = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/product/get-products/${params.slug}`
    );
    setProduct(data.product);
    getRelatedProducts(data?.product._id, data?.product.category._id);

    // console.log(product);
  };
  useEffect(() => {
    getSingleProduct();
  }, []);
  const getRelatedProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-products/${pid}/${cid}`
      );
      // console.log(data.relatedProducts);
      if (data?.success) setRelated(data.relatedProducts);
      // console.log("related", related);
    } catch (err) {
      console.log(err);
    }
  };
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
    <Layout title={product.name}>
      <div className="details-container" style={{ width: "100%" }}>
        <div
          className="product-details d-flex "
          style={{
            padding: "40px",
            fontFamily: "ubuntu,sans-serif",
          }}
        >
          <div
            className=""
            style={{
              border: "2px solid black",
              width: "22rem",
            }}
          >
            <img
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
              className="card-img-top card-img"
              alt={product.name}
              style={{ minHeight: "25vw" }}
            />
            <hr />
            <div className="" style={{ margin: "20px", display: "flex" }}>
              <button
                style={{
                  // width: "30%",
                  backgroundColor: "#6cc305",
                  border: "none",
                  fontWeight: "600",
                  borderRadius: "4px",
                  padding: "13px",
                  fontSize: "20px",
                  color: "white",
                }}
              >
                BUY NOW{" "}
              </button>
              <button
                onClick={() => {
                  if (auth?.user) {
                    handleCart(product);
                  } else toast.error("Login to Add items to Cart");
                }}
                style={{
                  // maxWidth: "45%",
                  borderRadius: "4px",
                  backgroundColor: "#dc3545",
                  border: "none",
                  fontWeight: "600",
                  padding: "13px",
                  marginLeft: "20px",
                  fontSize: "20px",
                  color: "white",
                }}
              >
                ADD TO CART{" "}
              </button>
            </div>
          </div>

          <div className="details" style={{}}>
            <h3 style={{ fontSize: "22px", color: "grey", fontWeight: "bold" }}>
              {product && product.name}
            </h3>
            <h4 style={{ fontSize: "20px", color: "black" }}>
              {product && product.desc}
            </h4>
            <h4
              style={{ fontSize: "20px", color: "black", fontWeight: "bold" }}
            >
              ${product && product.price}
            </h4>
            <h5
              style={{ fontSize: "20px", color: "#6cc305", fontWeight: "bold" }}
            >
              In stock : {product && product.quantity}
            </h5>
            <div className="reviews">
              <h1>ratings and reviews </h1>
            </div>
          </div>
        </div>
        <hr />
        <div
          className="recommended-products text-center"
          style={{ padding: "40px" }}
        >
          <div className="related-products">
            <h2>Similar Products</h2>

            {related.length ? (
              related.map((p) => (
                <Link to={`/product/${p.name}`}>
                  {/* {window.location.reload()} */}
                  <div
                    className="card m-4 Product-card "
                    style={{
                      width: "17rem",

                      marginLeft: "10px",
                    }}
                  >
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top card-img"
                      alt={p.name}
                    />

                    <div className="card-body">
                      <h5
                        className="card-title"
                        style={{ color: "grey", fontSize: "17px" }}
                      >
                        {p.name}
                      </h5>
                      <p className="card-text" style={{ fontWeight: "400" }}>
                        {p.desc}
                      </p>
                      <p
                        className="card-price"
                        style={{
                          color: "green",
                          fontWeight: "700",
                          fontSize: "20px",
                        }}
                      >
                        ${p.price}
                        <button className="add-to-cart">🛒 ADD TO CART</button>
                      </p>
                      {/* <button className="btn btn-secondary">ADD TO CART</button> */}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <h6>No similar products</h6>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
