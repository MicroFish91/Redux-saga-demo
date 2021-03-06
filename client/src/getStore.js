import { Iterable } from "immutable";
import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import { reducer } from "./combineReducers";
import { defaultState } from "./defaultState";
import { initSagas } from "./initSagas";
import { getQuery } from "./utility";

const stateTransformer = (state) => {
  if (Iterable.isIterable(state)) return state.toJS();
  else return state;
};

const logger = createLogger({
  stateTransformer,
});

export const getStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleWares = [sagaMiddleware, thunk];
  if (getQuery()["logger"]) {
    middleWares.push(logger);
  }
  const composables = [applyMiddleware(...middleWares)];
  const enhancer = compose(...composables);
  const store = createStore(reducer, defaultState, enhancer);
  console.info("Saga middleware implemented...");
  initSagas(sagaMiddleware);
  return store;
};
