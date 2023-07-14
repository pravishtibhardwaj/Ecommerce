import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import "../styles/AdminDashboard.css";
import { useAuth } from "../../context/AuthProvider";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title="Admin Dashboard">
      <div className="main-admin " style={{ paddingBottom: "40px" }}>
        <div className="sidebar">
          <AdminMenu />
        </div>
        <div className="content">
          <div className="profile-pic">
            <h2>Profile</h2>
          </div>
          <div className="details">
            <h5>{auth?.user?.name}</h5>
            <h5>{auth?.user?.email}</h5>
            <h5>{auth?.user?.phone}</h5>
            <br />
            <br />
            <div className="desc">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error,
              debitis. Beatae nihil quaerat laboriosam itaque corporis eos velit
              reprehenderit, repellendus omnis, possimus hic, ipsa dolores
              ratione tempora ipsum voluptates nostrum.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
