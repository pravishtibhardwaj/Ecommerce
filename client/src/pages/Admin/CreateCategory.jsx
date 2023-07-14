import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";
import Layout from "../../components/Layout/Layout.jsx";
import axios from "axios";
import "../styles/createCategory.css";
import ReactPaginate from "react-paginate";
import { toast } from "react-hot-toast";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(null);

  //PAGINATION LOGIC
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryPerPage] = useState(5);

  const indOfLastCat = currentPage * categoryPerPage;
  const indOfFirstCat = indOfLastCat - categoryPerPage;
  const currentCategories = categories.slice(indOfFirstCat, indOfLastCat);
  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (err) {
      // console.log(err);
      toast.error("error occured while fetching categories");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  const handleDelete = async (pid) => {
    try {
      const res = await axios.delete(`/api/v1/category/delete-category/${pid}`);
      if (res?.data?.success) {
        toast.success(" Deleted successfully");
        getAllCategories();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      // console.log(err);
      toast.error("something went wrong");
    }
  };

  const handleUpdate = async (pid) => {
    try {
      const res = await axios.put(`/api/v1/category/update-category/${pid}`, {
        name,
      });

      if (res?.data?.success) {
        toast.success(res.data.message);
        getAllCategories();
      } else toast.error(res.data.message);
    } catch (err) {
      // console.log(err);
      toast.error("something went wrong");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (res.data.success) {
        toast.success(`${name} is created `);
        getAllCategories();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      // console.log(err);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title="New Category">
      <div className="main-admin ">
        <div className="sidebar">
          <AdminMenu />
        </div>
        <div className="content-head">
          {" "}
          <div className="content-cat">
            <div className="addCat">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                + New Category
              </button>
              <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        Category Name
                      </h1>

                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <input
                      style={{
                        margin: "10px",
                        border: "none",
                        padding: "5px",
                      }}
                      type="text"
                      placeholder="enter name here"
                      id="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        onClick={handleSubmit}
                        type="submit"
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="showCat ">
              <table className="table  table-borderless  table-striped table-1">
                <thead>
                  {currentCategories.length !== 0 ? (
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Actions</th>
                    </tr>
                  ) : (
                    <span></span>
                  )}
                </thead>
                <tbody>
                  {currentCategories.map((c, ind) => (
                    <tr>
                      <td>{indOfFirstCat + ind + 1}</td>
                      <td key={c._id}>{c.name}</td>
                      <td className="actions">
                        {/* //MODAL CODE ------------------------------------ */}
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{
                            color: "black",
                            backgroundColor: "white",
                            border: "none",
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop1"
                          onClick={() => setSelected(c)}
                        >
                          Edit
                        </button>
                        <div
                          className="modal fade"
                          id="staticBackdrop1"
                          data-bs-backdrop="static"
                          data-bs-keyboard="false"
                          tabIndex={-1}
                          aria-labelledby="staticBackdrop1Label"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1
                                  className="modal-title fs-5"
                                  id="staticBackdrop1Label"
                                >
                                  Category Name
                                </h1>

                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                />
                              </div>
                              <input
                                style={{
                                  margin: "10px",
                                  border: "none",
                                  padding: "5px",
                                }}
                                type="text"
                                placeholder="enter name here"
                                id="name"
                                value={name}
                                onChange={(e) => {
                                  setName(e.target.value);
                                }}
                              />

                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  onClick={() => {
                                    handleUpdate(selected._id);
                                  }}
                                  type="submit"
                                  className="btn btn-primary"
                                  data-bs-dismiss="modal"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          style={{
                            color: "black",
                            backgroundColor: "white",
                            border: "none",
                            margin: "4px",
                          }}
                          className="btn btn-primary"
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                        >
                          🗑️Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <ReactPaginate
                onPageChange={paginate}
                pageCount={Math.ceil(categories.length / categoryPerPage)}
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
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
