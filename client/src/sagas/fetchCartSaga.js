import fetch from "isomorphic-fetch";
import { put, take, takeLatest } from "redux-saga/effects";
import { setCartItems, SET_CURRENT_USER } from "./../actions";

// function* fetchCart({ user }) {
//   const { id } = user;
//   const response = yield fetch(`http://localhost:8081/cart/${id}`);
//   const { items } = yield response.json();
//   yield put(setCartItems(items));
// }

export function* fetchCartSaga() {
  const { user } = yield take(SET_CURRENT_USER);
  const { id } = user;
  const response = yield fetch(`http://localhost:8081/cart/${id}`);
  const { items } = yield response.json();
  yield put(setCartItems(items));
  console.info("Set cart items: ", items);
}
