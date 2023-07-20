import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useCart } from "../../context/CartProvider";
import "../styles/Cart.css";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import ProductionQuantityLimitsRoundedIcon from "@mui/icons-material/ProductionQuantityLimitsRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import emptyCart from "../../assets/emptyCart.webp";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
const Cart = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [address, setAddress] = useState("");
  // const [phone, setPhone] = useState("");
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleRemove = async (pid) => {
    // try {
    //   let mycart = cart.filter((c) => c._id !== pid);
    //   setCart(mycart);
    //   localStorage.setItem("cart", JSON.stringify(mycart));
    // } catch (Err) {
    //   console.log(Err);
    // }
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem(`cart_${auth?.user?._id}`, JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  const returnTotalPrice = () => {
    let total = 0;
    cart?.map((c) => (total += c.price));
    return total.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  const getToken = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
    );
    setClientToken(res.data?.clientToken);
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem(`cart_${auth?.user?._id}`);
      setCart([]);

      setTimeout(() => {
        navigate("/dashboard/user/orders");
        setLoading(false);
      }, 1000);
      toast.success("Payment Successfull");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="main-cart">
        <div className="cart-products">
          <div className="delivery-address">
            <p>{auth?.user && auth?.token ? auth?.user?.address : ""}</p>
            <button
              onClick={() => {
                navigate("/dashboard/user");
              }}
            >
              Change
            </button>
          </div>
          {auth?.user && auth?.token && cart.length ? (
            cart.map((p) => (
              <div className="cart-product d-flex">
                <Link
                  to={`/product/${p.name}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="cart-img">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    />
                  </div>
                </Link>
                <div className="cart-details">
                  <Link
                    to={`/product/${p.name}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <h5 className="cart-desc">{p.desc}</h5>
                  </Link>
                  <h6
                    className="cart-title"
                    style={{ color: "darkgrey", fontWeight: "bold" }}
                  >
                    {p.name}
                  </h6>
                  <h6 className="cart-price" style={{ fontWeight: "bold" }}>
                    <CurrencyRupeeIcon fontSize="11px" color="lightgrey" />

                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "grey",
                        fontWeight: "300",
                        fontSize: "14px",
                      }}
                    >
                      1200
                    </span>
                    {"  "}
                    <CurrencyRupeeIcon fontSize="13px" />
                    {p.price}
                  </h6>
                  <h6
                    className="cart-qty"
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      backgroundColor: "green",
                      width: "fit-content",
                      padding: "4px",
                      borderRadius: "20px",
                      fontSize: "12px",
                    }}
                  >
                    In Stock
                  </h6>
                </div>
                <div className="extra-details d-flex">
                  <button
                    onClick={() => handleRemove(p._id)}
                    style={{
                      // backgroundColor: "white",
                      // color: "red",
                      border: "none",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    <RemoveCircleOutlineRoundedIcon
                      fontSize="10px"
                      padding="0px"
                    />{" "}
                    Remove
                  </button>
                  <p className="delivery-date">Delivered By 14 July | Free</p>
                </div>
              </div>
            ))
          ) : (
            <h4 className="text-center" style={{ padding: "50px" }}>
              <img
                src={emptyCart}
                alt=""
                style={{ width: "40vw", alignItems: "center" }}
              />
              <br />
              Your Cart is Empty{" "}
              <span>
                <Link
                  to={"/"}
                  style={{ fontSize: "18px", textDecoration: "none" }}
                >
                  Explore new Products
                </Link>
              </span>
            </h4>
          )}
        </div>
        <div className="checkout-items">
          <h4>Cart Summary | Price details</h4>
          <hr />
          <h6>Total Items : {cart.length}</h6>
          <h6>Total Price : {returnTotalPrice()}</h6>
          <hr />
          <div>
            {!clientToken || !auth?.token || !cart.length ? (
              ""
            ) : (
              <>
                {" "}
                <DropIn
                  options={{
                    authorization: clientToken,
                    // paypal: {
                    //   flow: "vault",
                    // },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <button
                  onClick={handlePayment}
                  disabled={loading || !instance || !auth?.user?.address}
                >
                  {loading ? "Processing..." : "Make Payment"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
