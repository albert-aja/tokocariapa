import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { rupiah } from "../../utils/formatRupiah";

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 25 : 20,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <Link
      className="productCard"
      to={`/product/${product._id}`}
      key={product._id}
    >
      <img src={product.gambar[0].url} alt={product.nama} />
      <p>{product.nama}</p>
      <div>
        <ReactStars {...options} />
        <span className="productCardSpan">{product.numOfReviews} Reviews</span>
      </div>
      <span>{rupiah(product.harga)}</span>
    </Link>
  );
};

export default ProductCard;
