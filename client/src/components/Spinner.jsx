import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = () => {
  const navigate = useNavigate();
  const Location = useLocation();
  const [count, setCount] = useState(3);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevC) => --prevC);
    }, 1000);
    if (count === 0)
      navigate("/login", {
        state: Location.pathname,
      });

    return () => clearInterval(interval);
  }, [count, navigate, Location]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        minHeight: "40vw",
      }}
    >
      <h1 style={{ color: "red" }}>Access Denied ! </h1>
      <h5 style={{ fontFamily: "revert", color: "grey", fontSize: "20px" }}>
        Authorisation needed
      </h5>
      <br />
      <div
        className="spinner-border m-5"
        style={{
          minWidth: "3rem",
          minHeight: "3rem",
        }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <h2>Redirecting you in {count} </h2>
    </div>
  );
};

export default Spinner;
