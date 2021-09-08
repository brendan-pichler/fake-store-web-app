// Actions
export const CART_REQUESTED = 'CART_REQUESTED';
export const CART_RECEIVED = 'CART_RECEIVED';
export const CART_ERROR = 'CART_ERROR';

export interface CartRequested {
    type: "CART_REQUESTED";
}

interface CartReceived {
    type: "CART_RECEIVED";
    cart: Cart;
}

interface CartError {
    type: "CART_ERROR";
    error: Error;
}

type CartAction = CartRequested | CartReceived | CartError;


// Action Creators
export const cartRequested = (): CartRequested => ({
    type: CART_REQUESTED,
});

export const cartReceived = (cart: Cart): CartReceived => ({
    type: CART_RECEIVED,
    cart
})

export const cartError = (error: Error): CartError => ({
    type: CART_ERROR,
    error
})

const initialState: CartState = {
    cart: null,
    loading: false,
    error: null,
}

// Reducer
const cartReducer = (state: CartState = initialState, action: CartAction) => {
    switch (action.type) {
        case CART_REQUESTED:
            return {  ...state, loading: true, error: null }
        case CART_RECEIVED:
            const { cart } = action as CartReceived
            return { ...state, cart, loading: false, error: null };
        case CART_ERROR:
            const { error } = action as CartError
            return { ...state, error, loading: false, cart: undefined };
        default:
            return state;
    }
}

interface CartState {
    cart: Cart | null;
    loading: boolean;
    error: Error | null;
}


export interface Cart {
    id: number;
    userId: number;
    date: string;
    products: [{
        productId: number;
        quantity: number;
    }]
}

export type CartKeys = keyof Cart;


export default cartReducer;
