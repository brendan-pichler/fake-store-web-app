import { call, put } from 'redux-saga/effects';
import { ProductFilter, ProductsRequested, productsReceived, productsError  } from '../ducks/product'
import { baseUrl } from '../../config/fakeStore';


const requestProducts = (filter?: ProductFilter): Promise<Response> => {
    let filterUrl = '';
    if (filter?.category) {
        filterUrl += `/category/${filter.category}`;
    }
    return fetch(`${baseUrl}/products${filterUrl}`).then(response => response.json());
}

const fetchProducts = function*(action: ProductsRequested): Generator<any> {
    try {
        const products: any = yield call(requestProducts, action.filter);
        yield put(productsReceived(products));
    } catch (error) {
        yield put(productsError(error as Error));
    }
}

export default fetchProducts;