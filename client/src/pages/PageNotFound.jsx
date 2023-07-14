import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <Layout title="not found">
      <p className="pnf-content">
        404 <br />
        <h3>Oops ! Page Not Found</h3>
        <h1>
          <Link to="/" className="pnf-btn">
            Go Back
          </Link>
        </h1>
      </p>
    </Layout>
  );
};

export default PageNotFound;
