import { User } from '../../_models';
import { AuthActionTypes, All } from '../actions/auth.actions';


export interface State {
    isAuthenticated: boolean;
    user: User | null;
    errorMessage: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
};

export function reducer(state = initialState, action: All): State {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    username: action.payload.username
                },
                errorMessage: null
            };
        }
        case AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                errorMessage: 'Incorrect email and/or password.'
            };
        }
        case AuthActionTypes.REGISTER_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    username: action.payload.username
                },
                errorMessage: null
            };
        }
        case AuthActionTypes.REGISTER_FAILURE: {
            return {
                ...state,
                errorMessage: 'That email is already in use.'
            };
        }
        case AuthActionTypes.LOGOUT: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}