import React from "react";
import { useSearch } from "../context/SearchProvider";
import Layout from "../components/Layout/Layout.jsx";
const SearchPage = () => {
  const [values, setValues] = useSearch();
  //   console.log(values.result.result.length);
  return (
    <Layout>
      <h2 style={{ textAlign: "center", padding: "20px" }}>Search Results</h2>
      <h4 style={{ textAlign: "center" }}>
        {values.result.result.length} Items Found
      </h4>
      <div
        className="d-flex flex-wrap"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        {values && values.result.result ? (
          values.result.result.map((p) => (
            <div
              className="card m-4 Product-card "
              style={{
                width: "17rem",

                marginLeft: "10px",
              }}
            >
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                className="card-img-top card-img"
                alt={p.name}
              />

              <div className="card-body">
                <h5
                  className="card-title"
                  style={{ color: "grey", fontSize: "17px" }}
                >
                  {p.name}
                </h5>
                <p className="card-text" style={{ fontWeight: "400" }}>
                  {p.desc}
                </p>
                <p
                  className="card-price"
                  style={{
                    color: "green",
                    fontWeight: "700",
                    fontSize: "20px",
                  }}
                >
                  ${p.price}
                  <button className="add-to-cart">🛒 ADD TO CART</button>
                </p>
                {/* <button className="btn btn-secondary">ADD TO CART</button> */}
              </div>
            </div>
          ))
        ) : (
          <h3 style={{ color: "lightgrey" }}>
            <br />
            <br />
            👎NO PRODUCT FOUND
          </h3>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
