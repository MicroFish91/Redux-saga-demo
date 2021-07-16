import { eventChannel } from "redux-saga";
import { put, take } from "redux-saga/effects";
import { setCustomerServiceAvailability } from "../actions";
import { connect } from "../createSocketConnection";

export function* setCustomerServiceAvailabilitySaga() {
  const socket = connect();
  const chan = new eventChannel((emit) => {
    const enableSupportMessage = () => {
      emit(true);
    };
    const disableSupportMessage = () => {
      emit(false);
    };

    socket.on(`SUPPORT_AVAILABLE`, enableSupportMessage);
    socket.on(`SUPPORT_NOT_AVAILABLE`, disableSupportMessage);

    return () => {};
  });

  while (true) {
    const supportAvailable = yield take(chan);
    yield put(setCustomerServiceAvailability(supportAvailable));
  }
}
