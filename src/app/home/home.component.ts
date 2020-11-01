import { Component, OnInit } from '@angular/core';
import { Accesstokens } from '../models/accesstokens';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: Accesstokens;
  users = [];

  constructor(private authenticationService:AuthenticationService,private userService:UserService) {
    this.currentUser=this.authenticationService.currentUserValue;
   }

  ngOnInit(): void {
    this.loadUser();
  }
private loadUser(){
  return this.userService.get()
    .subscribe(data=>this.users==data);
}
}
