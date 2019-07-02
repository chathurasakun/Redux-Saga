import { put, takeEvery, takeLatest } from 'redux-saga/effects'
import { loadUsersSuccess, GET_LIST_FAILURE, GET_LIST_REQUEST, GET_LIST_SUCCESS } from './Actions/CartAction';
import Api from '../server/Service'

async function fetchAsync(func) {
  const response = await func();
  if (response.ok) {
    return await response.json();
  }
  throw new Error("Unexpected error!!!");
}
function* fetchList() {
  try {
    const cardList = yield fetchAsync(Api.getAll);
    yield put({ type: GET_LIST_SUCCESS, payload: cardList.fruits });
  } catch (error) {
    yield put({ type: GET_LIST_FAILURE, payload: error });
  }
}
export function* listSaga() {
  // Allows concurrent fetches of users
  yield takeEvery(GET_LIST_REQUEST, fetchList);
  // Does not allow concurrent fetches of users
  // yield takeLatest(LOAD_USERS_LOADING, fetchUser);
}
export default listSaga;