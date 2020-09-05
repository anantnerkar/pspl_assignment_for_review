import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AccountService } from '@app/_services';
import { User } from '@app/_models';


@Component({ 
    templateUrl: 'list.component.html',
    styleUrls: ['./list.component.scss'] 
})
export class ListComponent implements OnInit {
    books = null;

    constructor(private accountService: AccountService,
                private router: Router) {
        //this.bookList = this.accountService.getAllBooks;

        this.isLoggedIn = true;
        this.accountService.getAllBooks().subscribe(data => {
            console.log("data..", data);
            this.bookList = data;
            console.log(this.bookList);
          });
    }

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(books => this.books = books);
    }

    user: User;
    bookList: any=[];
    public isLoggedIn: boolean;

    deleteBook(id: string) {
        const book = this.bookList.find(x => x.id === id);
        console.log(book);
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.bookList = this.bookList.filter(x => x.id !== id));
    }

    editBook(book: any) {
        const user = this.bookList.find(x => x.id === book.id);
       console.log("user..", user);
        this.accountService.update(book.id, book)
            .pipe(first())
            .subscribe(() => this.bookList = this.bookList.filter(x => x.id !== book.id));
    }

    // deleteBook(id): void {
    //     this.accountService.deleteBookData(id).subscribe(getdata => {
    //       this.bookList = this.bookList.filter(item => item.id !== id);
    //     });
    //   }
    
    addNewBook(): void {
         this.router.navigate(['/users/add']);
      }
}
