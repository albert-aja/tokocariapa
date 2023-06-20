import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Products.css";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";

const Kategoris = ["Laptop", "Handphone", "Jam", "Buku", "Baju", "Celana"];

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [harga, setHarga] = useState([0, 10000000]);
  const [kategori, setKategori] = useState("");
  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    hitungproduct,
    hasilPerPage,
    filteredProductsCount,
    error,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const hargaHandler = (event, hargaBaru) => {
    setHarga(hargaBaru);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, harga, kategori, ratings));
  }, [dispatch, keyword, currentPage, harga, kategori, ratings, alert, error]);

  let count = filteredProductsCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUK -- TOKO CARIAPA" />

          <h2 className="productsHeading">Produk</h2>
          <div className="products">
            {products ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p>
                Too many request from this IP, please try again in 10 minutes!
              </p>
            )}
          </div>

          <div className="filterBox">
            <Typography>Harga</Typography>
            <Slider
              value={harga}
              onChange={hargaHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-Slider"
              min={0}
              max={10000000}
            />

            <Typography>Kategori</Typography>
            <ul className="categoryBox">
              {Kategoris.map((kategori) => (
                <li
                  className="category-link"
                  key={kategori}
                  onClick={() => setKategori(kategori)}
                >
                  {kategori}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
                valueLabelDisplay="auto"
              />
            </fieldset>
          </div>

          {hasilPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={hasilPerPage}
                totalItemsCount={hitungproduct}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
