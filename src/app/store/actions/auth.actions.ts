import { Action } from '@ngrx/store';


export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGIN_FAILURE = '[Auth] Login Failure',
    REGISTER = '[Auth] Register',
    REGISTER_SUCCESS = '[Auth] Signup Success',
    REGISTER_FAILURE = '[Auth] Signup Failure',
    LOGOUT = '[Auth] Logout'
}

export class LogIn implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: any) { }
}

export class LogInSuccess implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: any) { }
}

export class LogInFailure implements Action {
    readonly type = AuthActionTypes.LOGIN_FAILURE;
    constructor(public payload: any) { }
}

export class Register implements Action {
    readonly type = AuthActionTypes.REGISTER;
    constructor(public payload: any) { }
}

export class RegisterSuccess implements Action {
    readonly type = AuthActionTypes.REGISTER_SUCCESS;
    constructor(public payload: any) { }
}

export class RegisterFailure implements Action {
    readonly type = AuthActionTypes.REGISTER_FAILURE;
    constructor(public payload: any) { }
}

export class LogOut implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}

export type All =
    | LogIn
    | LogInSuccess
    | LogInFailure
    | Register
    | RegisterSuccess
    | RegisterFailure
    | LogOut;

