import { call, put } from 'redux-saga/effects';
import { baseUrl } from '../../config/fakeStore';
import { Cart, cartReceived, cartError } from '../ducks/cart';

const requestCarts = (): Promise<Response> => {
    return fetch(`${baseUrl}/carts/user/1`).then(response => response.json());
}

const sortCartsByDate = (carts: Cart[]) => {
    return carts.sort((cart1: Cart, cart2: Cart) => {
        return new Date(cart1.date).getTime() - new Date(cart2.date).getTime();
    })
}

const fetchCarts = function*(): Generator<any> {
    try {
        const carts: any = yield call(requestCarts);
        const sortedCarts = sortCartsByDate(carts);
        yield put(cartReceived(sortedCarts[0]));
    } catch (error) {
        yield put(cartError(error as Error));
    }
}

export default fetchCarts;