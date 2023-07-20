import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";
import Layout from "../../components/Layout/Layout.jsx";
import axios from "axios";
import "../styles/createCategory.css";
import ReactPaginate from "react-paginate";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";

const AllProducts = () => {
  const [product, setProducts] = useState([]);

  //PAGINATION LOGIC
  const [currentPage, setCurrentPage] = useState(1);
  const [ProductPerPage] = useState(6);

  const indOfLastProduct = currentPage * ProductPerPage;
  const indOfFirstProduct = indOfLastProduct - ProductPerPage;
  const currentProducts = product.slice(indOfFirstProduct, indOfLastProduct);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-products`
      );
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (err) {
      // console.log(err);
      toast.error("error in fetching");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handleDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are you sure you want to delete this product? "
      );
      if (!answer) return;
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      if (res.data.success) {
        // <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        //   <Alert
        //     onClose={handleClose}
        //     severity="success"
        //     sx={{ width: "100%" }}
        //   >
        //     {res.data.message}
        //   </Alert>
        // </Snackbar>;
        toast.success(res.data.message);
        getAllProducts();
      } else toast.error(res.data.message);
    } catch (err) {
      toast.error("something went wrong while deleting");
    }
  };
  return (
    <Layout title="All Products">
      <div className=" main-admin-product main-admin ">
        <div className="sidebar">
          <AdminMenu />
        </div>
        <div
          className="col-md-9 all-products "
          style={{
            paddingLeft: "50px",
          }}
        >
          <h3 style={{ margin: "20px", textAlign: "center" }}>All Products</h3>
          <div
            className="d-flex flex-wrap"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            {currentProducts?.map((p) => (
              <div
                className="card m-3 Product-card "
                style={{
                  width: "14rem",
                  marginLeft: "10px",
                }}
              >
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top card-img"
                  alt={p.name}
                  style={{ minHeight: "17vw" }}
                />
                <div className="actions overlay">
                  <Link
                    key={p._id}
                    to={`/dashboard/admin/product/${p.slug}`}
                    className="product-link"
                    style={{ textDecoration: "none" }}
                  >
                    <button
                      className="update-product"
                      // onClick={() => handleUpdate}
                    >
                      Update
                    </button>
                  </Link>
                  <Link
                    key={p._id}
                    to=""
                    className="product-link"
                    style={{ textDecoration: "none" }}
                  >
                    <button
                      className="delete-product"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  </Link>
                </div>

                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{ color: "grey", fontSize: "17px" }}
                  >
                    {p.name}
                  </h5>
                  <p
                    className="card-text"
                    style={{ fontWeight: "400", wordBreak: "break-word" }}
                  >
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
                    Rs. {p.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <ReactPaginate
            onPageChange={paginate}
            pageCount={Math.ceil(product.length / ProductPerPage)}
            previousLabel={<span>&laquo;</span>}
            nextLabel={<span>&raquo;</span>}
            containerClassName={"pagination justify-content-center"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-link"}
            nextClassName={" page-link"}
            activeLinkClassName="active"
          />
        </div>
      </div>
    </Layout>
  );
};

export default AllProducts;
