import React from "react";
import axios from "axios";
import { useSearch } from "../context/SearchProvider";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, result: data });
      // console.log(values);
      navigate(`/search/${values.keyword}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search Here"
          style={{
            padding: "0px",
            fontSize: "15px",
            outline: "none",
            border: "none",
            marginRight: "4px",
            width: "20vw",
          }}
          value={values.keyword}
          onChange={(e) => {
            setValues({ ...values, keyword: e.target.value });
          }}
        />
        <button
          type="submit"
          style={{
            border: "2px solid black",
            padding: "1px",
            borderRadius: "7px",
            backgroundColor: "white",
            color: "black",
            display: "none",
          }}
        >
          search
        </button>
      </form>
    </div>
  );
};

export default Search;
