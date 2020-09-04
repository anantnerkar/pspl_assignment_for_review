import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';
import { LoginComponent } from '../account/login.component';
import { HeaderComponent } from '../_components/header/header.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ComponentRoutingModule
    ],
    declarations: [
        LoginComponent,
        HeaderComponent
    ]
})
export class ComponentModule { }