import React, { useEffect, useState } from "react";
import UserSidebar from "../../components/Layout/UserSidebar";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import moment from "moment";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data.orders);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title="User orders">
      <div
        className="home-content "
        style={{ paddingBottom: "40px", display: "flex" }}
      >
        <div className="sidebar">
          <UserSidebar />
        </div>
        {/* {JSON.stringify(orders)} */}
        <div
          className="order-content"
          style={{
            width: "100%",
            height: "fit-content",
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <div
            className="orders"
            style={{
              margin: "10px",
              padding: "40px",
              // backgroundColor: "white",
            }}
          >
            <h1 className="text-center">ALL Orders</h1>
            {!orders.length ? (
              <h5>You Have 0 Orders</h5>
            ) : (
              orders.map((o, i) => (
                <div
                  style={{
                    backgroundColor: "white",
                    margin: "20px",
                    padding: "20px",
                  }}
                >
                  <div className="table-responsive">
                    <table className="table" style={{}}>
                      <thead>
                        <tr>
                          <td scope="col">#</td>
                          <td scope="col">Buyer</td>
                          <td scope="col">Quantity</td>
                          <td scope="col">Total Amount</td>
                          <td scope="col">Date</td>
                          <td scope="col">Payment</td>
                          <td scope="col">Status</td>
                        </tr>
                      </thead>
                      <tbody>
                        {" "}
                        <tr>
                          <th>{i + 1}</th>
                          <th>{o.buyers.name}</th>
                          <th>{o.products.length}</th>

                          <th>{o.payment.transaction.amount}</th>
                          <th>{moment(o?.createdAt).fromNow()}</th>
                          <th>{o?.payment.success ? "Success" : "Failed"}</th>
                          <th>{!o.status ? "Not Processed" : o.status}</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {o?.products.map((p) => (
                    <div
                      className="cart-product d-flex"
                      // style={{ justifyContent: "space-evenly" }}
                    >
                      <Link
                        to={`/product/${p.name}`}
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <div className="cart-img">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            style={{ width: "17vw" }}
                          />
                        </div>
                      </Link>
                      <div
                        className="cart-details"
                        style={{ marginLeft: "90px" }}
                      >
                        <Link
                          to={`/product/${p.name}`}
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                        >
                          <h5 className="cart-desc">{p.desc}</h5>
                        </Link>
                        <h6
                          className="cart-title"
                          style={{
                            color: "darkgrey",
                            fontWeight: "bold",
                          }}
                        >
                          {p.name}
                        </h6>
                        <h6
                          className="cart-price"
                          style={{ fontWeight: "bold" }}
                        >
                          <CurrencyRupeeIcon
                            fontSize="11px"
                            color="lightgrey"
                          />

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
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
