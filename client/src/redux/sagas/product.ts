import { call, put } from 'redux-saga/effects';
import { ProductFilter, ProductsRequested, productsReceived, productsError, Product, ProductKeys  } from '../containers/product'
import { baseUrl } from '../../config/fakeStore';

// This filter will match any products that have a corresponding attribute in product filter
// If the corresponding attribute in product filter is a substring of the product attribute, it will match
// Easily extensible, but the code only ever calls this filter with the title key set (from the search input)
const filterProducts = (products: Product[], productFilter: ProductFilter): Product[] => {
    if (productFilter === undefined) {
        return products;
    } else {
        return products.filter((product: Product) => {
            const productFilterKeys = Object.keys(productFilter);
            return productFilterKeys.filter((filterKey) => {
                const productValue = product[filterKey as ProductKeys];
                const filterValue = productFilter[filterKey as ProductKeys];

                if (typeof productValue === "string" && typeof filterValue === "string") {
                    return productValue.toLowerCase().indexOf(filterValue.toLowerCase()) > -1 ;
                } else {
                    return true;
                }

            }).length === productFilterKeys.length;
        })
    }
}

export const requestProduct = (productId: number): Promise<Response> => {
    return fetch(`${baseUrl}/products/${productId}`).then(response => response.json());
}

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
        const filteredProducts = filterProducts(products, action.filter);
        yield put(productsReceived(filteredProducts));
    } catch (error) {
        yield put(productsError(error as Error));
    }
}

export default fetchProducts;