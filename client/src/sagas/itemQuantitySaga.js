import fetch from "isomorphic-fetch";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { currentUserSelector } from "../selectors";
import {
  decreaseItemQuantity,
  DECREASE_ITEM_QUANTITY,
  FETCHED,
  FETCHING,
  INCREASE_ITEM_QUANTITY,
  setItemQuantityFetchStatus,
} from "./../actions";

export function* handleIncreaseItemQuantity({ id }) {
  yield put(setItemQuantityFetchStatus(FETCHING));
  const user = yield select(currentUserSelector);
  const response = yield call(
    fetch,
    `http://localhost:8081/cart/add/${user.get("id")}/${id}`
  );

  if (response.status !== 200) {
    yield put(decreaseItemQuantity(id, true));
    alert(
      "Sorry, there weren't enough items in stock to complete your request."
    );
  }
  yield put(setItemQuantityFetchStatus(FETCHED));
}

export function* handleDecreaseItemQuantity({ id, local }) {
  if (local) {
    return;
  }
  yield put(setItemQuantityFetchStatus(FETCHING));
  const user = yield select(currentUserSelector);
  const response = yield call(
    fetch,
    `http://localhost:8081/cart/remove/${user.get("id")}/${id}`
  );
  if (response.status !== 200) {
    console.warn("Received non-200 status:: ", response);
  }
  yield put(setItemQuantityFetchStatus(FETCHED));
}

export function* itemQuantitySaga() {
  yield all([
    takeLatest(DECREASE_ITEM_QUANTITY, handleDecreaseItemQuantity),
    takeLatest(INCREASE_ITEM_QUANTITY, handleIncreaseItemQuantity),
  ]);
}
