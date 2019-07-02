import * as KeyConstants from '../KeyConstants';

export const addToCart = (item) => {
  return {
    type: KeyConstants.default.ADD_TO_CART,
    payload: item
  }
}

export const removeFromCart = (item) => {
  return {
    type: KeyConstants.default.REMOVE_FROM_CART,
    payload: item
  }
}

export const getListRequest = () => {
  return { type: GET_LIST_REQUEST };
};

export const GET_LIST_REQUEST = 'GET_LIST_REQUEST';
export const GET_LIST_SUCCESS = 'GET_LIST_SUCCESS';
export const GET_LIST_FAILURE = 'GET_LIST_FAILURE';
