import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserSidebar from "../../components/Layout/UserSidebar.jsx";
import "../styles/AdminDashboard.css";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import "../styles/UserDashboard.css";
import { toast } from "react-toastify";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [disbaleInput, setDisableInput] = useState(true);

  //getUser data
  useEffect(() => {
    const { email, name, phone, address } = auth.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth.user]);
  const handleUpdate = async (e) => {
    e.preventDefault(); // use to prevemt default refresh

    try {
      const { data } = await axios.put("/api/v1/auth/update-profile", {
        name,
        email,
        phone,
        address,
      });
      if (data.error) {
        toast.error("cannot update ");
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <Layout title="User Dashboard">
      <div className="main-admin " style={{ paddingBottom: "40px" }}>
        <div className="sidebar">
          <UserSidebar />
        </div>
        <div className="content">
          <div className="profile-pic">
            <h2>Your Profile</h2>
          </div>
          <div className="details ">
            <form onSubmit={handleUpdate} className="profile-form">
              <div className="mb-3 d-flex user-profile-input">
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
                  placeholder=" your name"
                  disabled={disbaleInput}
                  required
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDisableInput(false);
                  }}
                >
                  <ModeEditOutlineRoundedIcon />
                </button>
              </div>
              <div className="mb-3 d-flex user-profile-input">
                <label htmlFor="exampleInputEmail1" className="">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder=" your email "
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  disabled={disbaleInput}
                  required
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDisableInput(false);
                  }}
                >
                  <ModeEditOutlineRoundedIcon />
                </button>
              </div>

              <div className="mb-3 d-flex user-profile-input">
                <label htmlFor="exampleInputMobile" className="">
                  Mobile
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputMobile"
                  placeholder=" your Mobile No."
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  disabled={disbaleInput}
                  required
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDisableInput(false);
                  }}
                >
                  <ModeEditOutlineRoundedIcon />
                </button>
              </div>
              <div className="mb-3 d-flex user-profile-input">
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
                  disabled={disbaleInput}
                  required
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDisableInput(false);
                  }}
                >
                  <ModeEditOutlineRoundedIcon />
                </button>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => {
                  setDisableInput(true);
                }}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
