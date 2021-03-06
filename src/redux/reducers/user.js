import UniversalCookie from 'universal-cookie';

/* eslint-disable no-alert, no-console */

const initialState = {
    error: null,
    user: null,
};
export const userReducer = (state = initialState, action) => {
    const cookie = new UniversalCookie();
    switch (action.type) {
        case 'LOGIN_SUCCESS': {
            cookie.set('session', action.payload.token, {
                maxAge: 1000 * 60 * 60 * 5,
                path: '/',
            });
            return {
                ...state,
                error: null,
                user: {
                    id: action.payload.id,
                    name: action.payload.name,
                    email: action.payload.email,
                    logo: action.payload.logo,
                },
            };
        }
        case 'LOGOUT_SUCCESS': {
            cookie.remove('session');
            return initialState;
        }
        default:
            return state;
    }
};
