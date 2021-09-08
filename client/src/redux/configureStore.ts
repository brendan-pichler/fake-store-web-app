import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import userReducer from './containers/user';
import productReducer from './containers/product';
import cartReducer from './containers/cart';
import rootSaga from './rootSaga';

const rootReducer = combineReducers({
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [ sagaMiddleware ];

const store = createStore(rootReducer, {}, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>

export default store;