import { useState, useEffect } from "react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import Spinner from "../Spinner";
const AdminPrivate = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/v1/auth/admin-auth");
      if (res.data.ok) {
        setOk(true);
      } else setOk(false);
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner />; //An <Outlet> should be used in parent route elements to render their child route elements.
  //This allows nested UI to show up when child routes are rendered.
};

export default AdminPrivate;
