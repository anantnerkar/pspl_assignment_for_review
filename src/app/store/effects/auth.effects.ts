import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AccountService } from '../../_services/account.service';
import {
    AuthActionTypes,
    LogIn, LogInSuccess, LogInFailure,
    Register, RegisterSuccess, RegisterFailure,
    LogOut,
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

    constructor(
        private actions: Actions,
        private authService: AccountService,
        private router: Router,
    ) { }

    @Effect()
    LogIn: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN),
        map((action: LogIn) => action.payload),
        switchMap(payload => {
            return this.authService.login({ username: payload.username, password: payload.password }).pipe(
                map((user) => {
                    if (user.length > 0) {
                        return new LogInSuccess({ username: payload.username });
                    } else {
                        return new LogInFailure({ error: 'Invalid credentials' });
                    }
                }));
        }));

    @Effect({ dispatch: false })
    LogInSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap((user) => {
            this.router.navigateByUrl('/');
        })
    );

    @Effect({ dispatch: false })
    LogInFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_FAILURE)
    );

    @Effect()
    Register: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.REGISTER),
        map((action: Register) => action.payload),
        switchMap(payload => {
            return this.authService.register(payload).pipe(
                map((result) => {
                    return new RegisterSuccess(result);
                }));
        }));

    @Effect({ dispatch: false })
    RegisterSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.REGISTER_SUCCESS),
        tap((user) => {
            this.router.navigateByUrl('/');
        })
    );

    @Effect({ dispatch: false })
    RegisterFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.REGISTER_FAILURE)
    );

    @Effect({ dispatch: false })
    public LogOut: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap((user) => {
            localStorage.removeItem('token');
        })
    );
}