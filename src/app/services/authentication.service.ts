import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Userlog } from '../models/userlog';
import { Accesstokens } from "../models/accesstokens";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Accesstokens>;
  public currentUser: Observable<Accesstokens>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Accesstokens>(JSON.parse(localStorage.getItem("currentUser")));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Accesstokens {
    return this.currentUserSubject.value;
  }

  login(userlog:Userlog) {
    return this.http.post<any>("http://localhost:50529/api/user/Login", userlog)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }))
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}