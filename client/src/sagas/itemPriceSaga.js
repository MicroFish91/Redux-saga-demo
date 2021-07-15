import fetch from "isomorphic-fetch";
import { all, call, put, take } from "redux-saga/effects";
import { setItemPrice, SET_CART_ITEMS, SET_CURRENT_USER } from "../actions";

function* fetchItemPrice(id, currency) {
  const response = yield fetch(
    `http://localhost:8081/prices/${currency}/${id}`
  );
  const json = yield response.json();
  const price = json[0].price;
  yield put(setItemPrice(id, price));
}

export function* itemPriceSaga() {
  const [{ user }, { items }] = yield all([
    take(SET_CURRENT_USER),
    take(SET_CART_ITEMS),
  ]);
  yield all(items.map((item) => call(fetchItemPrice, item.id, user.country)));
}
