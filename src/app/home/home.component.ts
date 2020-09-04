import { Component } from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;
    bookList: any=[];
    public isLoggedIn: boolean;

    constructor(private accountService: AccountService) {
        //this.bookList = this.accountService.getAllBooks;

        this.isLoggedIn = true;
        this.accountService.getAllBooks().subscribe(data => {
            console.log("data..", data);
            this.bookList = data;
            console.log(this.bookList);
          });
    }


}