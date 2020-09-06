import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { retry, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient,
        
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public getAllBooks(): Observable<any> {
        return this.http.get(`${environment.apiUrl}` + '/bookList');
    }

    public getAccountDetails(): Observable<any> {
        return this.http.get(`${environment.apiUrl}` + 'login');
      }
    
    public postAccountDetails(value): Observable<any> {
        return this.http.post(`${environment.apiUrl}` + '/users', value);
      }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(user: User): Observable<User[]> {
        console.log("user..", user);
        const url = encodeURI('users?username=' + user.username + '&password=' + user.password);
        return this.http.get<User[]>(`${environment.apiUrl}/` + url).pipe(
          retry(1),
          catchError(this.handleError)
        );
    }

    register(user: User): Observable<User> {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
        const url = encodeURI('users');
        return this.http.post<User>(`${environment.apiUrl}/` + url, user, httpOptions).pipe(
          retry(1),
          catchError(this.handleError)
        );
    }

    // tslint:disable-next-line: typedef
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

    logout() {
        // remove user from local storage and set current user to null
        //this.store.dispatch(new LogOut);
        this.router.navigate(['/account/login']);
    }

    logOut(): void {
        // tslint:disable-next-line: new-parens
        this.store.dispatch(new LogOut);
      }

    // register(user: User) {
    //     return this.http.post(`${environment.apiUrl}/users/register`, user);
    // }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                return x;
            }));
    }
}