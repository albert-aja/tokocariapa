import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";
import { rupiah } from "../../utils/formatRupiah";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const ProductDetails = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 25 : 20,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.nama} -- TOKO CARIAPA`} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.gambar &&
                  product.gambar.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.nama}</h2>
                <p>Produk # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{rupiah(product.harga)}</h1>
                {user.isAuthenticated ? (
                  <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                      <button id="minus" onClick={subtract}>
                        -
                      </button>
                      <input value="1" type="number" id="txtNumber" />
                      <button id="plus" onClick={add}>
                        +
                      </button>
                    </div>{" "}
                    <button id="addCart" onClick={addToCart}>
                      Tambah Keranjang
                    </button>
                  </div>
                ) : (
                  ""
                )}
                <p>
                  Status:{" "}
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "Stock Habis" : "Stock Tersedia"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Deskripsi:<p>{product.deskripsi}</p>
              </div>
              {user.isAuthenticated ? (
                <button className="submitReview">Submit Review</button>
              ) : (
                ""
              )}
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews">Tidak Ada Review</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );

  function addToCart() {
    let url = `${window.location.origin}/api/v1/cart/new`;
    let status;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.user._id,
        product_id: product._id,
        jumlah: parseInt(document.getElementById("txtNumber").value),
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          alert.success("produk telah ditambahkan ke keranjang");
        }
      })
      .catch((err) => {
        alert.error(err);
      });
  }
};

function add() {
  var txtNumber = document.getElementById("txtNumber");
  var newNumber = parseInt(txtNumber.value) + 1;
  txtNumber.value = newNumber;
}

function subtract(e) {
  e.preventDefault();
  var txtNumber = document.getElementById("txtNumber");
  var newNumber = parseInt(txtNumber.value) - 1;
  txtNumber.value = newNumber;
  return false;
}

export default ProductDetails;
