import {
  ALL_CART_REQUEST,
  ALL_CART_SUCCESS,
  ALL_CART_FAIL,
  CLEAR_ERRORS,
} from "../constants/cartConstant";

export const cartReducer = (state = { carts: [] }, action) => {
  switch (action.type) {
    case ALL_CART_REQUEST:
      return {
        loading: true,
        carts: [],
      };
    case ALL_CART_SUCCESS:
      return {
        loading: false,
        carts: action.payload.carts,
      };
    case ALL_CART_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
