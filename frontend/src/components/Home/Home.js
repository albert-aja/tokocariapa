import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Toko Cariapa" />
          <div className="banner">
            <p>Selamat Datang di TokoCariApa</p>
            <h1>Temukan Produk Luar Biasa di bawah ini</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />{" "}
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Produk Unggulan</h2>
          <div className="container" id="container">
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
