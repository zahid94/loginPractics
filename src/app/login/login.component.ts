import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Userlog } from "../models/userlog";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm=new Userlog("","");
  returnUrl:string;
  constructor(private route:ActivatedRoute,private router:Router, private auth: AuthenticationService) {
    // redirect to home if already logged in
    if (this.auth.currentUserValue) {
      this.router.navigate(['/']);
  }
   }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  onSubmit() {
    //console.log(this.loginForm)
    return this.auth.login(this.loginForm)
      .subscribe(data => 
        this.router.navigate([this.returnUrl]))
    }
}
