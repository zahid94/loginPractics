import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient, private userservice: UserService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("currentUser")));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  login(username, password) {
    return this.userservice.login(username, password)
      .subscribe(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      },
        error => console.log("please try again leter."));
  }

  logout() {
    // remove user from local storage and set current user to null
    return this.userservice.logout()
      .subscribe(data => {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
      },
        error => console.log("logout fail.")
      )
  }
}