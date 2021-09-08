// Actions
export const GET_USER = "GET_USER";
export const SET_USER = "SET_USER";

// Action Creators
export const getUser = (): UserAction => ({
    type: GET_USER
});

export const setUser = (user: User): UserAction => ({
    type: SET_USER,
    user
})

const initialState: UserState = {
    user: undefined
}

// Reducer
const userReducer = (state: UserState = initialState, action: UserAction) => {
    switch (action.type) {
        case SET_USER:
            const { user } = action;
            return { ...state, user };
        default:
            return state;
    }
}

export interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    name: {
        firstname: string;
        lastname: string;
    };
    address: {
        city: string;
        street: string;
        number: number;
        zipcode: string;
        geolocation: {
            lat: number;
            long: number;
        }
    };
    phone: string;
}

interface UserAction {
    type: "GET_USER" | "SET_USER"
    user?: User
}

interface UserState {
    user: User | undefined
}

export default userReducer;
