import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { Store, StoreModule } from '@ngrx/store';
import { reducer } from '../store/reducers/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { from } from 'rxjs';
import { AuthEffects } from '../store/effects/auth.effects';
import { AccountService } from '@app/_services';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule,
        StoreModule.forRoot(reducer, {}),
        EffectsModule.forRoot([AuthEffects]),
    ],
    declarations: [
        LayoutComponent,
        LoginComponent,
        RegisterComponent
    ],
    providers: [AccountService]
})
export class AccountModule { }