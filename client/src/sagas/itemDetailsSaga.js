import fetch from "isomorphic-fetch";
import { all, fork, put, take } from "redux-saga/effects";
import { setItemDetails, SET_CART_ITEMS } from "./../actions";

export function* loadItemDetails(item) {
  const { id } = item;
  const response = yield fetch(`http://localhost:8081/items/${id}`);
  const data = yield response.json();
  const info = data[0];
  console.log(info);
  yield put(setItemDetails(info));
}

export function* itemDetailsSaga() {
  const { items } = yield take(SET_CART_ITEMS);
  yield all(
    items.map((item) => {
      console.log(item);
      return fork(loadItemDetails, item);
    })
  );
}
