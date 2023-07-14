import React from "react";

import "../../pages/styles/AdminDashboard.css";
import { NavLink } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { useAuth } from "../../context/AuthProvider";
const UserSidebar = () => {
  const [auth] = useAuth();
  return (
    <div className="menu-main-content">
      <div className="hello">Hello ! {auth?.user?.name}</div>
      <hr />
      <NavLink to="/dashboard/user" className="sidenav-item active">
        My Profile
      </NavLink>
      <Divider style={{ backgroundColor: "grey" }} />
      <NavLink to="/dashboard/user/orders" className="sidenav-item">
        My Orders
      </NavLink>
    </div>
  );
};
export default UserSidebar;
