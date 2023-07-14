import React from "react";
import "../../pages/styles/AdminDashboard.css";
import { NavLink } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { useAuth } from "../../context/AuthProvider";
const AdminMenu = () => {
  const [auth, setAuth] = useAuth();
  return (
    <div className="menu-main-content">
      <div className="hello">Hello ! {auth?.user?.name}</div>
      <hr />
      <NavLink to="/dashboard/admin/create-product" className="sidenav-item">
        Create New Product
      </NavLink>
      <Divider style={{ backgroundColor: "grey" }} />
      <NavLink to="/dashboard/admin/create-category" className="sidenav-item">
        Create New Category
      </NavLink>
      <Divider style={{ backgroundColor: "grey" }} />
      <NavLink to="/dashboard/admin/all-products" className="sidenav-item">
        All Products
      </NavLink>
      <Divider style={{ backgroundColor: "grey" }} />
      <NavLink to="/dashboard/admin/all-users" className="sidenav-item">
        All Users
      </NavLink>
      <NavLink to="/dashboard/admin/orders" className="sidenav-item">
        All Orders
      </NavLink>
    </div>
  );
};

export default AdminMenu;
