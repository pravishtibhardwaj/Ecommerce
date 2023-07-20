import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import signupimg from "../../assets/signupimg.jpg";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // use to prevemt default refresh

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        {
          name,
          email,
          password,
          phone,
          address,
          answer,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <Layout className="register-form">
      <div className="main-content">
        <div className="side-content">
          <div className="upper-part">
            <h3>Hey ! looks like you are new here</h3>
            <h5>
              Sign Up with your email and access all the features of ShopWay
            </h5>
          </div>
          <div className="lower-part">
            <img src={signupimg} alt="" />
          </div>
        </div>
        <div className="register">
          <h1 className="register-head navbar-brand">Welcome to 🛍️ShopWay</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputName"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter your email "
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputMobile" className="">
                Mobile
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputMobile"
                placeholder="Enter your Mobile No."
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputAddress" className="">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputAddress"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputAnswer" className="">
                Your Favourite color ?
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputAnswer"
                placeholder="your answer here "
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
