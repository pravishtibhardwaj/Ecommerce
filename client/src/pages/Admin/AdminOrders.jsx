import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Select } from "antd";
import AdminMenu from "../../components/Layout/AdminMenu";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
const Option = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);

  const [orders, setAdminOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getAdminOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/admin-orders`
      );
      setAdminOrders(data.orders);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (auth?.token) getAdminOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        {
          status: value,
        }
      );
      // console.log(status);
      //   setStatus(data.status);
      getAdminOrders();
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Layout title={"all orders"}>
      <div className=" main-admin-product main-admin ">
        <div className="sidebar">
          <AdminMenu />
        </div>
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
                          <th>
                            <Select
                              bordered={false}
                              onChange={(value) => handleChange(o._id, value)}
                              defaultValue={o?.status}
                            >
                              {status.map((s, i) => (
                                <Option key={i} value={s}>
                                  {s}
                                </Option>
                              ))}
                            </Select>
                          </th>
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
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
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

export default AdminOrders;
