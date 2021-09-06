import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import userReducer from './ducks/user';
import productReducer from './ducks/product';
import rootSaga from './rootSaga';

const rootReducer = combineReducers({
    user: userReducer,
    products: productReducer,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [ sagaMiddleware ];

const store = createStore(rootReducer, {}, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>

export default store;