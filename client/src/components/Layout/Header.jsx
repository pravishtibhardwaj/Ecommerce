import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Search from ".././Search.jsx";
import HomeIcon from "@mui/icons-material/HomeRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge } from "antd";
import { useCart } from "../../context/CartProvider";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  // const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    if (open == true) setOpen(false);
    else setOpen(true);
  };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  return (
    <>
      <nav className="navbar" style={{ width: "100%" }}>
        {/* <div className="side-navbar"></div> */}
        <div
          className="nav-container "
          style={{ display: "flex", width: "100%", paddingTop: "7px" }}
        >
          {/* <button className="burger" onClick={handleDrawer}>
            <MenuIcon />
          </button> */}
          <div className="brand" style={{ width: "20%", paddingLeft: "20px" }}>
            {" "}
            <Link
              to="/"
              className="navbar-b"
              style={{ textDecoration: "none", color: "black" }}
            >
              <LocalMallRoundedIcon fontSize="10px" />
              ShopWay <div className="navbar-s"></div>
            </Link>
          </div>

          <div
            className="search-bar"
            style={{
              width: "53%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <SearchRoundedIcon />
            <Search />
          </div>
          <ul
            className="nav-list"
            style={{
              display: "flex",
              textDecoration: "none",
              listStyle: "none",
              // paddingRight: "15px",
            }}
          >
            <li className="nav-item">
              <NavLink to="/" className="nav-link ">
                <HomeIcon />
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink to="/category" className="nav-link">
                Category
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink to="/cart/cart-products" className="nav-link">
                <Badge count={cart.length} showZero>
                  <ShoppingCartRoundedIcon />
                </Badge>
              </NavLink>
            </li>
            <li className="nav-item">
              {auth.user ? (
                <h1 style={{ display: "none" }}>Register</h1>
              ) : (
                <NavLink to="/register" className="nav-link ">
                  SignUp
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              {auth.user ? (
                <div className="dropdown">
                  <button
                    className="nav-link  dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth?.user?.name}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-lg-end">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/user-profile" className="dropdown-item">
                        My Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to="/"
                        className="dropdown-item"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </div>
              ) : (
                // <NavLink
                //   onClick={handleLogout}
                //   to="/"
                //   className="nav-link nav-btn"
                // >
                //   Logout
                // </NavLink>
                <NavLink to="/login" className="nav-link ">
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
