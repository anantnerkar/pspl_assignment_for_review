import * as auth from './reducers/auth.reducers';
//import * as offer from '../offer-store/reducers/offer.reducers';
import { createFeatureSelector } from '@ngrx/store';

export interface AppState {
    authState: auth.State;
   // offer: offer.State;
}

export const reducers = {
    auth: auth.reducer,
   // offer: offer.reducer

};

export const selectAuthState = createFeatureSelector<AppState>('auth');
//export const selectOfferState = createFeatureSelector<AppState>('offer');

