import { takeLatest, all } from 'redux-saga/effects';
import { GET_USER } from './ducks/user';
import { PRODUCTS_REQUESTED } from './ducks/product';
import { CART_REQUESTED } from './ducks/cart';
import handleGetUser from "./sagas/user";
import fetchProducts from './sagas/product'
import fetchCart from './sagas/cart'

const productSaga = function*() {
    yield takeLatest(PRODUCTS_REQUESTED, fetchProducts);
}

const userSaga = function*() {
    yield takeLatest(GET_USER, handleGetUser);
}

const cartSaga = function*() {
    yield takeLatest(CART_REQUESTED, fetchCart)
}

const rootSaga = function*() {
    yield all([
        userSaga(),
        productSaga(),
        cartSaga(),
    ])
}

export default rootSaga;