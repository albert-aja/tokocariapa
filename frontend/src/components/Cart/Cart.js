import React, { Fragment, useEffect } from "react";
import "../Home/Home.css";
import "./cart.css";
import MetaData from "../layout/MetaData";
import CartTable from "./CartTable";
import { clearErrors, getUserCart } from "../../actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Cart = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, carts } = useSelector((state) => state.carts);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getUserCart());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Toko Cariapa" />
          <h2 className="homeHeading">Keranjang Anda</h2>
          <div className="shopping-cart" id="shopping-cart">
            {user.isAuthenticated ? (
              carts ? (
                <CartTable carts={carts} />
              ) : (
                <p class="item-center">Keranjang Kosong</p>
              )
            ) : (
              <p class="item-center">Harap login</p>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
