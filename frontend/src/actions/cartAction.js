import axios from "axios";

import {
  ALL_CART_REQUEST,
  ALL_CART_SUCCESS,
  ALL_CART_FAIL,
  CLEAR_ERRORS,
} from "../constants/cartConstant";

export const getUserCart = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CART_REQUEST });

    const { data } = await axios.get(`/api/v1/cart/me`);

    dispatch({
      type: ALL_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_CART_FAIL,
      payload: error.response.data.pesan,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
