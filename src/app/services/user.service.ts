import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from "rxjs/operators";
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registration(user: User) {
    return this.http.post<User>("", user)
      .pipe(catchError(this.errorHandler))
  }
  edit(user: User) {
    return this.http.put<User>("", user)
      .pipe(catchError(this.errorHandler))
  }

  get() {
    return this.http.get("")
      .pipe(catchError(this.errorHandler))
  }

  delete(Id: number) {
    return this.http.delete("")
      .pipe(catchError(this.errorHandler))
  }

  login(username: string, password: string) {
    return this.http.post<any>("", { username, password })
      .pipe(catchError(this.errorHandler))
  }
  logout() {
    return this.http.get<any>("")
      .pipe(catchError(this.errorHandler))
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
