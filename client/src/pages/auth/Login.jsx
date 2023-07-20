import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import "../styles/Register.css";
import signupimg from "../../assets/signupimg.jpg";
import { useAuth } from "../../context/AuthProvider";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const Location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        toast.success(res.data.message);
        console.log(Location.state);
        navigate(Location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong2");
    }
  };
  return (
    <Layout className="register-form ">
      <div className="main-content">
        <div className="side-content ">
          <div className="upper-part login-upper-part">
            <h4>Welcome Back !</h4>
            <h6>Login with your email</h6>
          </div>
          <div className="lower-part login-lower-part">
            <img src={signupimg} alt="" />
          </div>
        </div>
        <div className="register login">
          <h1 className="register-head navbar-brand">Welcome to 🛍️ShopWay</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
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
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
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
              <Link to="/forgot-password" style={{ float: "right" }}>
                forgot password
              </Link>
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
