import { call, put } from 'redux-saga/effects';
import { setUser } from '../ducks/user'
import { baseUrl } from '../../config/fakeStore';

const requestGetUser = (): Promise<Response> => {
    return fetch(`${baseUrl}/users/1`).then(response => response.json());
}

const handleGetUser = function*(): Generator<any> {
    try {
        const user: any = yield call(requestGetUser);
        yield put(setUser(user));
    } catch (error) {
        console.log(error);
    }
}

export default handleGetUser;