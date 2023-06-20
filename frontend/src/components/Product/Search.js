import React, { Fragment, useState } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };
  return (
    <Fragment>
      <MetaData title="CARI PRODUK -- TOKO CARIAPA" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Cari Produk..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
