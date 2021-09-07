// Actions
export const PRODUCTS_REQUESTED = 'PRODUCTS_REQUESTED';
export const PRODUCTS_RECEIVED = 'PRODUCTS_RECEIVED';
export const PRODUCTS_ERROR = 'PRODUCTS_ERROR';

export interface ProductsRequested {
    type: "PRODUCTS_REQUESTED";
    filter: ProductFilter;
}

interface ProductsReceived {
    type: "PRODUCTS_RECEIVED";
    products: Product[];
}

interface ProductsError {
    type: "PRODUCTS_ERROR";
    error: Error;
}

type ProductAction = ProductsRequested | ProductsReceived | ProductsError;


// Action Creators
export const productsRequested = (filter?: ProductFilter): ProductsRequested => ({
    type: PRODUCTS_REQUESTED,
    filter
});

export const productsReceived = (products: Product[]): ProductsReceived => ({
    type: PRODUCTS_RECEIVED,
    products
})

export const productsError = (error: Error): ProductsError => ({
    type: PRODUCTS_ERROR,
    error
})

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
}

// Reducer
const userReducer = (state: ProductState = initialState, action: ProductAction) => {
    switch (action.type) {
        case PRODUCTS_REQUESTED:
            return {  ...state, loading: true, error: null }
        case PRODUCTS_RECEIVED:
            const { products } = action as ProductsReceived
            return { ...state, products, loading: false, error: null };
        case PRODUCTS_ERROR:
            const { error } = action as ProductsError
            return { ...state, error, loading: false };
        default:
            return state;
    }
}

interface ProductState {
    products: Product[];
    loading: boolean;
    error: Error | null;
}

// Filter by any field that the product contains
export type ProductFilter = Partial<Product> | undefined;

export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
}

export default userReducer;
