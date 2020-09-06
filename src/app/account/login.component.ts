import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AccountService, AlertService } from '@app/_services';
import { } from '../'
import { LogIn } from '../store/actions/auth.actions';
import { AppState, selectAuthState } from '../store/app.states';
import { Observable } from 'rxjs';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    getState: Observable<any>;
    errorMessage: string | null;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private store: Store<AppState>
    ) {
        this.getState = this.store.select(selectAuthState);
    }



  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
    this.errorMessage = null;

    console.log("this.errorMessage..", this.errorMessage);

    this.form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

  }


    // ngOnInit() {
    //     this.form = this.formBuilder.group({
    //         username: ['', Validators.required],
    //         password: ['', Validators.required]
    //     });
    //     this.getErrorMessage();
    // }

    // getErrorMessage() {
    //     this.getState.subscribe((state) => {
    //         this.errorMessage = state.errorMessage;
    //         //this.alertService.error(state.errorMessage);
    //       });
    //       this.errorMessage = null;
    //       //this.alertService.error("");
    // }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        //this.f.username.value, this.f.password.value
        this.loading = true;
        // this.accountService.getAccountDetails()
        //     .pipe(first())
        //     .subscribe({
        //         next: () => {
        //             // get return url from query parameters or default to home page
        //             const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        //             this.router.navigateByUrl(returnUrl);
        //         },
        //         error: error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         }
        //     });


        const payload = {
            username: this.f.username.value,
            password: this.f.password.value
        };
        console.log("payload..", payload);
        this.store.dispatch(new LogIn(payload));

    }
}