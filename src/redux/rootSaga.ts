import { takeLatest, all } from 'redux-saga/effects';
import { GET_USER } from './ducks/user';
import { PRODUCTS_REQUESTED } from './ducks/product';
import handleGetUser from "./sagas/user";
import fetchProducts from './sagas/product'

const productSaga = function*() {
    yield takeLatest(PRODUCTS_REQUESTED, fetchProducts);
}

const userSaga = function*() {
    yield takeLatest(GET_USER, handleGetUser);
}

const rootSaga = function*() {
    yield all([
        userSaga(),
        productSaga(),
    ])
}

export default rootSaga;